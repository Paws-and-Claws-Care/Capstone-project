import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";

import {
  getCartOrderByPet,
  createCartOrderForPet,
} from "../db/queries/orders.js";

import {
  addProductToOrder,
  getProductsByOrderId,
  updateOrderItemQuantity,
  deleteOrderItemByProduct,
} from "../db/queries/order_items.js";

import { getProductById } from "../db/queries/products.js"; // you already use this elsewhere

const router = express.Router();

/**
 * Helper: always return the user's cart order for this pet (create if missing)
 */
async function getOrCreateCartOrder(userId, petId) {
  let cart = await getCartOrderByPet(userId, petId);
  if (!cart) cart = await createCartOrderForPet(userId, petId);
  return cart;
}

/**
 * Helper: format response with totals
 */
function buildCartResponse(order, items) {
  const normalized = (items || []).map((i) => {
    const qty = Number(i.quantity || 0);
    const unit = Number(i.item_price ?? i.price ?? 0);
    const line_total = qty * unit;

    return {
      ...i,
      quantity: qty,
      item_price: unit,
      line_total,
    };
  });

  const order_total = normalized.reduce(
    (sum, i) => sum + Number(i.line_total || 0),
    0
  );

  return {
    order_id: order.id,
    pet_id: order.pet_id,
    items: normalized,
    order_total,
  };
}

/**
 * GET /api/pets/:petId/cart
 * Returns the open cart (creates if missing)
 */
router.get(
  "/pets/:petId/cart",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);
      const userId = req.user.id;

      if (!petId) return res.status(400).json({ message: "Invalid petId" });

      const cartOrder = await getOrCreateCartOrder(userId, petId);
      const items = await getProductsByOrderId(cartOrder.id);

      res.json(buildCartResponse(cartOrder, items));
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/pets/:petId/cart/items
 * Body: { productId, quantity }
 * Adds/increments product in cart
 */
router.post(
  "/pets/:petId/cart/items",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);
      const userId = req.user.id;

      const productId = Number(req.body.productId);
      const quantity = Number(req.body.quantity ?? 1);

      if (!petId) return res.status(400).json({ message: "Invalid petId" });
      if (!productId)
        return res.status(400).json({ message: "Invalid productId" });
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be > 0" });
      }

      const cartOrder = await getOrCreateCartOrder(userId, petId);

      // snapshot price from products table
      const product = await getProductById(productId);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      await addProductToOrder({
        order_id: cartOrder.id,
        product_id: productId,
        quantity,
        price: Number(product.price),
      });

      const items = await getProductsByOrderId(cartOrder.id);
      res.json(buildCartResponse(cartOrder, items));
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/pets/:petId/cart/items/:productId
 * Body: { quantity }
 * Sets exact quantity (0 => removes)
 */
router.patch(
  "/pets/:petId/cart/items/:productId",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);
      const userId = req.user.id;

      const productId = Number(req.params.productId);
      const quantity = Number(req.body.quantity);

      if (!petId) return res.status(400).json({ message: "Invalid petId" });
      if (!productId)
        return res.status(400).json({ message: "Invalid productId" });
      if (!Number.isFinite(quantity) || quantity < 0) {
        return res.status(400).json({ message: "Quantity must be >= 0" });
      }

      const cartOrder = await getOrCreateCartOrder(userId, petId);

      if (quantity === 0) {
        await deleteOrderItemByProduct(cartOrder.id, productId);
      } else {
        await updateOrderItemQuantity(cartOrder.id, productId, quantity);
      }

      const items = await getProductsByOrderId(cartOrder.id);
      res.json(buildCartResponse(cartOrder, items));
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/pets/:petId/cart/items/:productId
 * Removes item entirely
 */
router.delete(
  "/pets/:petId/cart/items/:productId",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);
      const userId = req.user.id;

      const productId = Number(req.params.productId);

      if (!petId) return res.status(400).json({ message: "Invalid petId" });
      if (!productId)
        return res.status(400).json({ message: "Invalid productId" });

      const cartOrder = await getOrCreateCartOrder(userId, petId);

      await deleteOrderItemByProduct(cartOrder.id, productId);

      const items = await getProductsByOrderId(cartOrder.id);
      res.json(buildCartResponse(cartOrder, items));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
