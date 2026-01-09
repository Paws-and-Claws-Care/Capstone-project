import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  getUserById,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
} from "../db/queries/users.js";

const router = express.Router();

/**
 * GET all users
 */
router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/**
 * GET user by username
 */
router.get("/username/:username", async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.params.username);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * GET user by id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * POST register
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ DO NOT hash here — createUser already hashes
    const user = await createUser({ username, email, password });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST login
 */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
