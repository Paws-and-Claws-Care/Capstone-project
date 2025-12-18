import express from "express";
import { createUser, getUserById } from "../db/queries/users.js";
const router = express.Router();
import bcrypt from "bcrypt";

router.get("/:id", async (req, res, next) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    return res.status(404).send("User not found.");
  }
  res.send(user);
});

export default router;
