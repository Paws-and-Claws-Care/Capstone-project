import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";
import { getPetsByUserId, createPet } from "../db/queries/pets.js";
import db from "../db/client.js"; // ✅ ADD THIS

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

// DELETE /api/pets/:id
router.delete("/:id", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const petId = Number(req.params.id);

    // make sure pet belongs to user
    const petCheck = await db.query(
      `SELECT id FROM pets WHERE id = $1 AND user_id = $2`,
      [petId, req.user.id]
    );
    if (!petCheck.rows[0]) return res.status(404).send("Pet not found.");

    // ✅ If orders reference this pet, delete those first (prevents foreign key errors)
    await db.query(
      `DELETE FROM order_items
       WHERE order_id IN (SELECT id FROM orders WHERE pet_id = $1 AND user_id = $2)`,
      [petId, req.user.id]
    );

    await db.query(`DELETE FROM orders WHERE pet_id = $1 AND user_id = $2`, [
      petId,
      req.user.id,
    ]);

    // delete pet
    await db.query(`DELETE FROM pets WHERE id = $1 AND user_id = $2`, [
      petId,
      req.user.id,
    ]);

    res.send({ deleted: true, petId });
  } catch (err) {
    next(err);
  }
});

export default router;
