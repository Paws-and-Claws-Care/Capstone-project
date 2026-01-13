// server/db/queries/order_items.js
import db from "../client.js";

/**
 * Add a product to an order.
 * - Requires price (snapshot of product price at time of add)
 * - If (order_id, product_id) already exists, increment quantity instead of erroring
 *   (because schema has UNIQUE (order_id, product_id))
 */
export async function addProductToOrder({
  order_id,
  product_id,
  quantity,
  price,
}) {
  if (!order_id || !product_id) {
    throw new Error("order_id and product_id are required");
  }
  if (quantity == null) {
    throw new Error("quantity is required");
  }
  if (price == null) {
    throw new Error("price is required");
  }

  const SQL = `
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (order_id, product_id)
    DO UPDATE SET
      quantity = order_items.quantity + EXCLUDED.quantity,
      price = EXCLUDED.price
    RETURNING *;
  `;

  const response = await db.query(SQL, [order_id, product_id, quantity, price]);
  return response.rows[0];
}

/**
 * Get products for an order (order_items joined with products)
 */
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
      order_items.quantity,
      order_items.price AS item_price
    FROM order_items
    JOIN products
      ON order_items.product_id = products.id
    WHERE order_items.order_id = $1
    ORDER BY products.id;
  `;
  const response = await db.query(SQL, [orderId]);
  return response.rows;
}

// Update quantity for a line item in an order
export async function updateOrderItemQuantity(orderId, productId, quantity) {
  const SQL = `
    UPDATE order_items
    SET quantity = $1
    WHERE order_id = $2 AND product_id = $3
    RETURNING *;
  `;
  const result = await db.query(SQL, [quantity, orderId, productId]);
  return result.rows[0] || null;
}

// Remove a line item from an order
export async function deleteOrderItemByProduct(orderId, productId) {
  const SQL = `
    DELETE FROM order_items
    WHERE order_id = $1 AND product_id = $2
    RETURNING *;
  `;
  const result = await db.query(SQL, [orderId, productId]);
  return result.rows[0] || null;
}
