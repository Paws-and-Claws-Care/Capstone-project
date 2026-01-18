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

import { getProductById } from "../db/queries/product.js";

import db from "../db/client.js";

const router = express.Router();

router.get("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const orders = await getOrdersByUserId(req.user.id);
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

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
        const price = Number(item.item_price ?? 0);
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

router.post("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const { date, pet_id, is_cart } = req.body;

    if (!pet_id) return res.status(400).send("pet_id is required.");

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
        price: product.price,
      });

      res.status(201).send(row);
    } catch (err) {
      next(err);
    }
  }
);

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

      const petCheck = await db.query(
        `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
        [petId, req.user.id]
      );
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      const product = await getProductById(productId);
      if (!product) return res.status(400).send("Product does not exist");

      let cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) {
        cart = await createCartOrderForPet(req.user.id, petId);
      }

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

router.post(
  "/pets/:petId/cart/checkout",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);

      // 1) Verify pet belongs to user
      const petCheck = await db.query(
        `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
        [petId, req.user.id]
      );
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      // 2) Find active cart
      const cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) return res.status(400).send("No active cart for this pet.");

      // 3) Prevent checkout if cart is empty ✅
      const cartItems = await getProductsByOrderId(cart.id);
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).send("Cart is empty.");
      }

      // 4) Mark cart as completed
      const update = await db.query(
        `UPDATE orders
         SET is_cart = false, date = CURRENT_DATE
         WHERE id = $1 AND user_id = $2 AND is_cart = true
         RETURNING *;`,
        [cart.id, req.user.id]
      );

      const completedOrder = update.rows[0];
      if (!completedOrder) {
        return res.status(400).send("Unable to checkout cart.");
      }

      // 5) Create a NEW empty cart for this pet ✅
      const newCart = await createCartOrderForPet(req.user.id, petId);

      res.send({
        success: true,
        completedOrder,
        newCart,
      });
    } catch (err) {
      next(err);
    }
  }
);

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
