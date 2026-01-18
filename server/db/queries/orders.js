import db from "../client.js";

export async function createOrder({ user_id, pet_id, date, is_cart = true }) {
  const SQL = `
    INSERT INTO orders (user_id, pet_id, date, is_cart)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const response = await db.query(SQL, [user_id, pet_id, date, is_cart]);
  return response.rows[0];
}

export async function getOrdersByUserId(user_id) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE user_id = $1
    `;
  const response = await db.query(SQL, [user_id]);
  return response.rows;
}

export async function getOrderById(id) {
  const SQL = `
    SELECT id, date, user_id, pet_id, is_cart
    FROM orders
    WHERE id = $1
  `;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
}

export async function getOrdersByProductIdForUser(productId, userId) {
  const SQL = `
    SELECT orders.*
    FROM orders
    JOIN order_items
    ON order_items.order_id = orders.id
    WHERE order_items.product_id = $1
    AND orders.user_id = $2
    ORDER BY orders.id
    `;
  const response = await db.query(SQL, [productId, userId]);
  return response.rows;
}

export async function getCartOrderByPet(userId, petId) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE user_id = $1
      AND pet_id = $2
      AND is_cart = true
    LIMIT 1;
  `;
  const response = await db.query(SQL, [userId, petId]);
  return response.rows[0];
}

export async function createCartOrderForPet(userId, petId) {
  const SQL = `
    INSERT INTO orders (user_id, pet_id, date, is_cart)
    VALUES ($1, $2, CURRENT_DATE, true)
    RETURNING *;
  `;
  const response = await db.query(SQL, [userId, petId]);
  return response.rows[0];
}

export async function getCompletedOrdersByPet(userId, petId) {
  const SQL = `
    SELECT
      o.id AS order_id,
      o.date,
      oi.quantity,
      oi.price,
      p.id AS product_id,
      p.name,
      p.image_url
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    WHERE o.user_id = $1
      AND o.pet_id = $2
      AND o.is_cart = false
    ORDER BY o.date DESC, o.id DESC;
  `;
  const response = await db.query(SQL, [userId, petId]);
  return response.rows;
}

export async function checkoutCartOrder(orderId) {
  const SQL = `
    UPDATE orders
    SET is_cart = false
    WHERE id = $1
      AND is_cart = true
    RETURNING *;
  `;
  const response = await db.query(SQL, [orderId]);
  return response.rows[0];
}
