import express from "express";
import productsRouter from "./products.js";
import usersRouter from "./users.js";
import ordersRouter from "./orders.js";
import authRouter from "./auth.js";
import forumRouter from "./forum.js";
import petsRouter from "./pets.js";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/products", productsRouter);

router.use("/users", usersRouter);

router.use("/orders", ordersRouter);

router.use("/forum", forumRouter);

router.use("/pets", petsRouter);

export default router;

//cheezitsAREgood
