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

/** Small helper: confirm pet belongs to user */
async function assertPetOwner(petId, userId) {
  const result = await db.query(
    `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
    [petId, userId]
  );
  return Boolean(result.rows[0]);
}

/** Small helper: confirm order belongs to user */
async function assertOrderOwner(orderId, userId) {
  const order = await getOrderById(orderId);
  if (!order) return { ok: false, status: 404, msg: "Order not found." };
  if (Number(order.user_id) !== Number(userId)) {
    return { ok: false, status: 403, msg: "Unauthorized access to order." };
  }
  return { ok: true, order };
}

router.get("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const orders = await getOrdersByUserId(req.user.id);
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

/**
 * Get order items + totals
 * GET /orders/:id/products
 */
router.get(
  "/:id/products",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const orderId = Number(req.params.id);
      if (!Number.isFinite(orderId)) {
        return res.status(400).send("Invalid order id.");
      }

      const check = await assertOrderOwner(orderId, req.user.id);
      if (!check.ok) return res.status(check.status).send(check.msg);

      const items = await getProductsByOrderId(orderId);

      // ✅ Always prefer snapshot price
      const itemsWithLineTotals = (items || []).map((item) => {
        const qty = Number(item.quantity || 0);

        // Try snapshot first; fall back only if your query returns different fields
        const unitRaw =
          item.price_at_purchase ??
          item.item_price ??
          item.unit_price ??
          item.price ??
          0;

        const unit = Number(unitRaw || 0);

        return {
          ...item,
          unit_price: unit,
          line_total: qty * unit,
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
 * Create order
 * POST /orders
 */
router.post("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const { date, pet_id, is_cart } = req.body;

    if (!pet_id) return res.status(400).send("pet_id is required.");

    // You were defaulting this to today even for carts; keeping behavior as-is
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
 * Add product to a specific order
 * POST /orders/:id/products
 */
router.post(
  "/:id/products",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const orderId = Number(req.params.id);
      const { productId, quantity } = req.body;

      if (!Number.isFinite(orderId)) {
        return res.status(400).send("Invalid order id.");
      }

      const check = await assertOrderOwner(orderId, req.user.id);
      if (!check.ok) return res.status(check.status).send(check.msg);

      if (!productId || quantity == null) {
        return res.status(400).send("Product ID and quantity are required.");
      }

      const product = await getProductById(productId);
      if (!product) return res.status(400).send("Product does not exist");

      const priceAtPurchase = Number(product.price ?? 0);

      const row = await addProductToOrder({
        order_id: orderId,
        product_id: Number(productId),
        quantity: Number(quantity),
        price: priceAtPurchase,
      });

      res.status(201).send(row);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * ✅ REORDER: copy items from a previous order into the selected pet's cart
 * POST /orders/:id/reorder
 * body: { petId }
 */
router.post(
  "/:id/reorder",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const orderId = Number(req.params.id);
      const petId = Number(req.body.petId);

      if (!Number.isFinite(orderId)) {
        return res.status(400).send("Invalid order id.");
      }
      if (!Number.isFinite(petId)) {
        return res.status(400).send("petId is required.");
      }

      // 1) Verify order belongs to user
      const check = await assertOrderOwner(orderId, req.user.id);
      if (!check.ok) return res.status(check.status).send(check.msg);

      // 2) Verify pet belongs to user
      const ownsPet = await assertPetOwner(petId, req.user.id);
      if (!ownsPet) return res.status(404).send("Pet not found.");

      // 3) Grab items from the old order
      const oldItems = await getProductsByOrderId(orderId);
      if (!oldItems || oldItems.length === 0) {
        return res.status(400).send("Nothing to reorder (order is empty).");
      }

      // 4) Find or create cart for this pet
      let cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) cart = await createCartOrderForPet(req.user.id, petId);

      // 5) Copy each item into the cart
      const addedItems = [];

      for (const item of oldItems) {
        const productId = Number(item.product_id);
        const qty = Number(item.quantity || 0);
        if (!Number.isFinite(productId) || qty <= 0) continue;

        // Always check product still exists
        const product = await getProductById(productId);
        if (!product) continue;

        // ✅ prefer snapshot price from old order, otherwise current product price
        const unitPriceRaw =
          item.price_at_purchase ??
          item.item_price ??
          item.unit_price ??
          item.price ??
          product.price ??
          0;

        const priceAtPurchase = Number(unitPriceRaw || 0);

        const added = await addProductToOrder({
          order_id: cart.id,
          product_id: productId,
          quantity: qty,
          price: priceAtPurchase,
        });

        addedItems.push(added);
      }

      res.send({
        success: true,
        orderId,
        petId,
        cartId: cart.id,
        addedCount: addedItems.length,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Add item to (or create) pet cart
 * POST /orders/pets/:petId/cart/items
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

      const ownsPet = await assertPetOwner(petId, req.user.id);
      if (!ownsPet) return res.status(404).send("Pet not found.");

      const product = await getProductById(productId);
      if (!product) return res.status(400).send("Product does not exist");

      let cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) cart = await createCartOrderForPet(req.user.id, petId);

      const row = await addProductToOrder({
        order_id: cart.id,
        product_id: Number(productId),
        quantity: Number(quantity),
        price: Number(product.price ?? 0),
      });

      res.status(201).send({ order: cart, added: row });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Update quantity in cart
 * PATCH /orders/pets/:petId/cart/items/:productId
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

      const ownsPet = await assertPetOwner(petId, req.user.id);
      if (!ownsPet) return res.status(404).send("Pet not found.");

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
 * Remove from cart
 * DELETE /orders/pets/:petId/cart/items/:productId
 */
router.delete(
  "/pets/:petId/cart/items/:productId",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);
      const productId = Number(req.params.productId);

      const ownsPet = await assertPetOwner(petId, req.user.id);
      if (!ownsPet) return res.status(404).send("Pet not found.");

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
 * Checkout pet cart
 * POST /orders/pets/:petId/cart/checkout
 */
router.post(
  "/pets/:petId/cart/checkout",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);

      const ownsPet = await assertPetOwner(petId, req.user.id);
      if (!ownsPet) return res.status(404).send("Pet not found.");

      const cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) return res.status(400).send("No active cart for this pet.");

      const cartItems = await getProductsByOrderId(cart.id);
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).send("Cart is empty.");
      }

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

/**
 * Order history by pet
 * GET /orders/pets/:petId/history
 */
router.get(
  "/pets/:petId/history",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);

      const ownsPet = await assertPetOwner(petId, req.user.id);
      if (!ownsPet) return res.status(404).send("Pet not found.");

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
          // ✅ FIX: use snapshot price (your query returns price_at_purchase)
          price: row.price_at_purchase,
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
