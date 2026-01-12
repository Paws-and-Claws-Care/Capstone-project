import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";
import { getPetsByUserId, createPet } from "../db/queries/pets.js";

const router = express.Router();

// GET /api/pets  (my pets)
router.get("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const pets = await getPetsByUserId(req.user.id);
    res.send(pets);
  } catch (err) {
    next(err);
  }
});

// POST /api/pets  (create pet)
router.post("/", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const { name, pet_type, breed } = req.body;
    if (!name || !pet_type) {
      return res.status(400).send("name and pet_type are required.");
    }

    const pet = await createPet({
      user_id: req.user.id,
      name,
      pet_type,
      breed,
    });

    res.status(201).send(pet);
  } catch (err) {
    next(err);
  }
});

export default router;
