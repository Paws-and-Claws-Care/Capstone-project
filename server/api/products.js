import express from "express";
import { getAllProducts, getProductById } from "../db/queries/product.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const products = await getAllProducts();
  res.send(products);
});
router.get("/:id", async (req, res, next) => {
  const product = await getProductById(req.params.id);
  if (!product) {
    return res.status(404).send("Product not found.");
  }
  res.send(product);
});

export default router;
