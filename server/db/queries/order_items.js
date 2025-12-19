import db from "../client.js";

export async function addProductToOrder({
  order_id,
  product_id,
  quantity,
  price,
}) {
  const SQL = `
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
  const response = await db.query(SQL, [order_id, product_id, quantity, price]);
  return response.rows[0];
}

export async function getProductsByOrderId(orderId) {
  const SQL = `
    SELECT
      products.id AS product_id,
      products.name,
      products.description,
      products.price,
      products.category,
      products.pet_type,
      products.image_url,
      order_items.quantity
    FROM order_items
    JOIN products
      ON order_items.product_id = products.id
    WHERE order_items.order_id = $1;
    `;
  const response = await db.query(SQL, [orderId]);
  return response.rows;
}
