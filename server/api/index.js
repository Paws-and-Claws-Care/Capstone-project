import express from "express";
import usersRouter from "./users.js";
const app = express.Router();

//define api routes here

app.use("/users", usersRouter);

export default app;
