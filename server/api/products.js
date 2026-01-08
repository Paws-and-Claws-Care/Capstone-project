import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByPetType,
} from "../db/queries/product.js";
import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";
import { getOrdersByProductIdForUser } from "../db/queries/orders.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { category, pet_type } = req.query;

    if (category) {
      const products = await getProductsByCategory(category);
      return res.send(products);
    }

    if (pet_type) {
      const products = await getProductsByPetType(pet_type);
      return res.send(products);
    }

    const products = await getAllProducts();
    res.send(products);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  const product = await getProductById(req.params.id);
  if (!product) {
    return res.status(404).send("Product not found.");
  }
  res.send(product);
});

router.get(
  "/:id/orders",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).send("Product not found.");

    const orders = await getOrdersByProductIdForUser(
      req.params.id,
      req.user.id
    );
    res.send(orders);
  }
);

export default router;
