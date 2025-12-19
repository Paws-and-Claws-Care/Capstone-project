import express from "express";
import productsRouter from "./products.js";
import usersRouter from "./users.js";

const router = express.Router();

//define api routes here

router.use("/products", productsRouter);

router.use("/users", usersRouter);

export default router;
