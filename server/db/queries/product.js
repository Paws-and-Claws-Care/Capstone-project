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

export async function getAllProducts() {
  const SQL = `
  SELECT *
  FROM products
  ORDER BY id
  `;
  const response = await db.query(SQL);
  return response.rows;
}

export async function getProductById(id) {
  const SQL = `
  SELECT *
  FROM products
  WHERE id = $1
  `;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
}

export async function getProductsByCategory(category) {
  const SQL = `
  SELECT * 
FROM products
WHERE category = $1;
  `;
  const response = await db.query(SQL, [category]);
  return response.rows;
}

export async function getProductsByPetType(petType) {
  const SQL = `
   SELECT *
    FROM products
    WHERE pet_type = $1;
  `;
  const response = await db.query(SQL, [petType]);
  return response.rows;
}
