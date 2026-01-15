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

import { getProductById } from "../db/queries/products.js";

const router = express.Router();

async function getOrCreateCartOrder(userId, petId) {
  let cart = await getCartOrderByPet(userId, petId);
  if (!cart) cart = await createCartOrderForPet(userId, petId);
  return cart;
}

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
