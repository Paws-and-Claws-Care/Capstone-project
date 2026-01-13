import db from "../client.js";

export async function getPetsByUserId(userId) {
  const SQL = `
    SELECT *
    FROM pets
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;
  const response = await db.query(SQL, [userId]);
  return response.rows;
}

export async function createPet({ user_id, name, pet_type, breed }) {
  const SQL = `
    INSERT INTO pets (user_id, name, pet_type, breed)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const response = await db.query(SQL, [
    user_id,
    name,
    pet_type,
    breed ?? null,
  ]);
  return response.rows[0];
}
