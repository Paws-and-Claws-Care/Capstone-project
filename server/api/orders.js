import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  getCartOrderByPet,
  createCartOrderForPet,
  getCompletedOrdersByPet,
} from "../db/queries/orders.js";
import requireUser from "../middleware/requireUser.js";
import {
  getProductsByOrderId,
  addProductToOrder,
} from "../db/queries/order_items.js";
import { getProductById } from "../db/queries/product.js";
import db from "../db/client.js";

const router = express.Router();

router.get("/", getUserFromToken, requireUser, async (req, res) => {
  const orders = await getOrdersByUserId(req.user.id);
  res.send(orders);
});

router.get("/:id", getUserFromToken, requireUser, async (req, res, next) => {
  const order = await getOrderById(req.params.id);

  if (!order) return res.status(404).send("Order not found.");

  if (order.user_id !== req.user.id)
    return res.status(403).send("Unauthorized access to order.");

  res.send(order);
});

router.get(
  "/:id/products",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    const orderId = req.params.id;

    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).send("Order not found.");
    }
    if (order.user_id !== req.user.id) {
      return res.status(403).send("Unauthorized access to order.");
    }

    const products = await getProductsByOrderId(orderId);
    res.send(products);
  }
);

router.post("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const { date, pet_id, is_cart } = req.body;

    if (!date) return res.status(400).send("Date is required.");
    if (!pet_id) return res.status(400).send("pet_id is required.");

    const order = await createOrder({
      user_id: req.user.id,
      pet_id,
      date,
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
      const orderId = req.params.id;
      const { productId, quantity } = req.body;

      const order = await getOrderById(orderId);
      if (!order) return res.status(404).send("Order not found.");
      if (order.user_id !== req.user.id)
        return res.status(403).send("Unauthorized access to order.");
      if (!productId || quantity == null)
        return res.status(400).send("Product ID and quantity are required.");

      const product = await getProductById(productId);
      if (!product) return res.status(400).send("Product does not exist");

      const row = await addProductToOrder({
        order_id: orderId,
        product_id: productId,
        quantity,
        price: product.price, // ✅ REQUIRED
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

      // 1) Make sure the pet belongs to the user
      const petCheckSQL = `SELECT id FROM pets WHERE id = $1 AND user_id = $2`;
      const petCheck = await db.query(petCheckSQL, [petId, req.user.id]);
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      // 2) Validate product exists
      const product = await getProductById(productId);
      if (!product) return res.status(400).send("Product does not exist");

      // 3) Find-or-create cart order for THIS pet
      let cart = await getCartOrderByPet(req.user.id, petId);
      if (!cart) {
        cart = await createCartOrderForPet(req.user.id, petId);
      }

      // 4) Add product to that cart order
      const row = await addProductToOrder({
        order_id: cart.id,
        product_id: productId,
        quantity,
        price: product.price, // ✅ REQUIRED
      });

      res.status(201).send({ order: cart, added: row });
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

      // ensure pet belongs to user
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

router.get(
  "/pets/:petId/history",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const petId = Number(req.params.petId);

      // ensure pet belongs to user
      const petCheck = await db.query(
        `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
        [petId, req.user.id]
      );
      if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

      const rows = await getCompletedOrdersByPet(req.user.id, petId);

      // group rows by order_id so frontend is easy
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
