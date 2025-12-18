import db from "../client.js";

export async function createProduct({
  name,
  description,
  price,
  category,
  pet_type,
  image_url,
  quantity,
}) {
  const SQL = `
    INSERT INTO products (name, description, price, category, pet_type, image_url, quantity)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;
  const response = await db.query(SQL, [
    name,
    description,
    price,
    category,
    pet_type,
    image_url,
    quantity,
  ]);
  return response.rows[0];
}
