import express from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  getUserByUsername,
} from "../db/queries/users.js";
const router = express.Router();
import bcrypt from "bcrypt";

router.get("/", async (req, res, next) => {
  const users = await getAllUsers();
  res.send(users);
});

router.get("/username/:username", async (req, res, next) => {
  const user = await getUserByUsername(req.params.username);
  if (!user) {
    return res.status(404).send("User not found.");
  }
  res.send(user);
});

router.get("/:id", async (req, res, next) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    return res.status(404).send("User not found.");
  }
  res.send(user);
});

export default router;
