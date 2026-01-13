// server/api/orders.js
import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";

import {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  getCartOrderByPet,
  createCartOrderForPet,
  getCompletedOrdersByPet,
} from "../db/queries/orders.js";

import {
  getProductsByOrderId,
  addProductToOrder,
  updateOrderItemQuantity,
  deleteOrderItemByProduct,
} from "../db/queries/order_items.js";

// ✅ IMPORTANT: make sure this path matches your actual file name
// If your file is product.js, change it back.
import { getProductById } from "../db/queries/product.js";

import db from "../db/client.js";

const router = express.Router();

/**
 * GET /api/orders
 * Return all orders for logged-in user
 */
router.get("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const orders = await getOrdersByUserId(req.user.id);
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/:id/products
 * Return order items joined with products + computed totals
 * Shape: { order_id, items, order_total }
 */
router.get(
  "/:id/products",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const orderId = Number(req.params.id);

      const order = await getOrderById(orderId);
      if (!order) return res.status(404).send("Order not found.");
      if (Number(order.user_id) !== Number(req.user.id)) {
        return res.status(403).send("Unauthorized access to order.");
      }

      const items = await getProductsByOrderId(orderId);

      const itemsWithLineTotals = (items || []).map((item) => {
        const qty = Number(item.quantity || 0);
        const price = Number(item.item_price ?? 0); // snapshot price from order_items
        return {
          ...item,
          line_total: qty * price,
        };
      });

      const order_total = itemsWithLineTotals.reduce(
        (sum, item) => sum + Number(item.line_total || 0),
        0
      );

      res.send({
        order_id: orderId,
        items: itemsWithLineTotals,
        order_total,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/orders
 * Create an order (generic)
 * Body: { date, pet_id, is_cart }
 */
router.post("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const { date, pet_id, is_cart } = req.body;

    if (!pet_id) return res.status(400).send("pet_id is required.");

    // If you want to require date, keep this check.
    // Otherwise, default it.
    const safeDate = date || new Date().toISOString().slice(0, 10);

    const order = await createOrder({
      user_id: req.user.id,
      pet_id,
      date: safeDate,
      is_cart: is_cart ?? true,
    });

    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/orders/:id/products
 * Add product to a specific order (generic)
 * Body: { productId, quantity }
 */
router.post(
  "/:id/products",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const orderId = Number(req.params.id);
      const { productId, quantity } = req.body;

      const order = await getOrderById(orderId);
      if (!order) return res.status(404).send("Order not found.");
      if (Number(order.user_id) !== Number(req.user.id)) {
        return res.status(403).send("Unauthorized access to order.");
      }

      if (!productId || quantity == null) {
        return res.status(400).send("Product ID and quantity are required.");
      }

      const product = await getProductById(productId);
      if (!product) return res.status(400).send("Product does not exist");

      const row = await addProductToOrder({
        order_id: orderId,
        product_id: productId,
        quantity,
        price: product.price, // snapshot
      });

      res.status(201).send(row);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/orders/pets/:petId/cart/items
 * Add item to the active cart for a pet (find-or-create cart order)
 * Body: { productId, quantity }
 */
router.post(
  "/pets/:petId/cart/items",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);
      const { productId, quantity } = req.body;

      if (!productId || quantity == null) {
        return res.status(400).send("Product ID and quantity are required.");
      }

      // ensure pet belongs to user
      const petCheck = await db.query(
        `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
        [petId, req.user.id]
      );
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      // validate product exists
      const product = await getProductById(productId);
      if (!product) return res.status(400).send("Product does not exist");

      // find-or-create cart order for this pet
      let cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) {
        cart = await createCartOrderForPet(req.user.id, petId);
      }

      // add product to cart (upsert/increment)
      const row = await addProductToOrder({
        order_id: cart.id,
        product_id: productId,
        quantity,
        price: product.price,
      });

      res.status(201).send({ order: cart, added: row });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/orders/pets/:petId/cart/items/:productId
 * Update quantity for a cart item (quantity 0 deletes)
 * Body: { quantity }
 */
router.patch(
  "/pets/:petId/cart/items/:productId",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);
      const productId = Number(req.params.productId);
      const quantity = Number(req.body.quantity);

      if (!Number.isFinite(productId)) {
        return res.status(400).send("Invalid productId.");
      }
      if (!Number.isFinite(quantity) || quantity < 0) {
        return res.status(400).send("Quantity must be 0 or more.");
      }

      const petCheck = await db.query(
        `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
        [petId, req.user.id]
      );
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      const cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) return res.status(400).send("No active cart for this pet.");

      if (quantity === 0) {
        const removed = await deleteOrderItemByProduct(cart.id, productId);
        return res.send({ orderId: cart.id, removed });
      }

      const updated = await updateOrderItemQuantity(
        cart.id,
        productId,
        quantity
      );
      res.send({ orderId: cart.id, updated });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/orders/pets/:petId/cart/items/:productId
 * Remove an item from pet cart
 */
router.delete(
  "/pets/:petId/cart/items/:productId",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);
      const productId = Number(req.params.productId);

      const petCheck = await db.query(
        `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
        [petId, req.user.id]
      );
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      const cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) return res.status(400).send("No active cart for this pet.");

      const removed = await deleteOrderItemByProduct(cart.id, productId);
      res.send({ orderId: cart.id, removed });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/orders/pets/:petId/cart/checkout
 * Convert cart -> placed order (is_cart false, set date)
 */
router.post(
  "/pets/:petId/cart/checkout",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);

      const petCheck = await db.query(
        `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
        [petId, req.user.id]
      );
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      const cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) return res.status(400).send("No active cart for this pet.");

      const update = await db.query(
        `UPDATE orders
         SET is_cart = false, date = CURRENT_DATE
         WHERE id = $1 AND user_id = $2
         RETURNING *;`,
        [cart.id, req.user.id]
      );

      res.send(update.rows[0]);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/orders/pets/:petId/history
 * Return completed orders for a pet, grouped for frontend
 */
router.get(
  "/pets/:petId/history",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);

      const petCheck = await db.query(
        `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
        [petId, req.user.id]
      );
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      const rows = await getCompletedOrdersByPet(req.user.id, petId);

      const grouped = rows.reduce((acc, row) => {
        if (!acc[row.order_id]) {
          acc[row.order_id] = {
            order_id: row.order_id,
            date: row.date,
            items: [],
          };
        }
        acc[row.order_id].items.push({
          product_id: row.product_id,
          name: row.name,
          image_url: row.image_url,
          quantity: row.quantity,
          price: row.price,
        });
        return acc;
      }, {});

      res.send(Object.values(grouped));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
