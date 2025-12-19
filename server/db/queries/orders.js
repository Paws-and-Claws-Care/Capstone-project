import db from "../client.js";

export async function createOrder({ user_id }) {
  const SQL = `
    INSERT INTO orders (user_id, date)
    VALUES ($1, $2)
    RETURNING *
    `;
  const response = await db.query(SQL, [user_id]);
  return response.rows[0];
}

export async function getOrdersByUserId(user_id) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE user_id = $1
    `;
  const response = await db.query(SQL, [user.id]);
  return response.rows;
}

export async function getOrderById(id) {
  const SQL = `
    SELECT id, date, user_id
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
