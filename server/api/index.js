import express from "express";
import productsRouter from "./products.js";
import usersRouter from "./users.js";
import ordersRouter from "./orders.js";
import authRouter from "./auth.js";

const router = express.Router();

//define api routes here

router.use("/auth", authRouter);

router.use("/products", productsRouter);

router.use("/users", usersRouter);

router.use("/orders", ordersRouter);

export default router;

//cheezitsAREgood

//testUser1
//testpass
