import db from "../client.js";

/**
 * Adds a product to an order (cart) and stores the price snapshot.
 * IMPORTANT:
 * - price_at_purchase should be the product price at the moment it is added
 * - if the item already exists, we do NOT overwrite the snapshot price
 *   (we only increase quantity)
 */
export async function addProductToOrder({
  order_id,
  product_id,
  quantity,
  price, // passed in from callers; stored as price_at_purchase
}) {
  if (!order_id || !product_id) {
    throw new Error("order_id and product_id are required");
  }

  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty <= 0) {
    throw new Error("quantity must be a positive number");
  }

  const itemPrice = Number(price);
  if (!Number.isFinite(itemPrice) || itemPrice < 0) {
    throw new Error("price must be a valid number");
  }

  const SQL = `
    INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (order_id, product_id)
    DO UPDATE SET
      quantity = order_items.quantity + EXCLUDED.quantity
    RETURNING *;
  `;

  const { rows } = await db.query(SQL, [order_id, product_id, qty, itemPrice]);
  return rows[0];
}

/**
 * Get products for an order.
 * Returns snapshot price as BOTH:
 * - price_at_purchase (raw snapshot)
 * - unit_price (consistent field for frontend)
 */
export async function getProductsByOrderId(orderId) {
  const SQL = `
    SELECT
      p.id AS product_id,
      p.name,
      p.description,
      p.category,
      p.pet_type,
      p.image_url,

      p.price AS current_price,                 -- informational only
      oi.price_at_purchase AS price_at_purchase,
      oi.price_at_purchase AS unit_price,       -- ✅ frontend-friendly alias

      oi.quantity
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = $1
    ORDER BY p.id;
  `;
  const { rows } = await db.query(SQL, [orderId]);
  return rows;
}

export async function updateOrderItemQuantity(orderId, productId, quantity) {
  const qty = Number(quantity);

  // If qty is 0 or less, remove it (common cart behavior)
  if (!Number.isFinite(qty) || qty <= 0) {
    return deleteOrderItemByProduct(orderId, productId);
  }

  const SQL = `
    UPDATE order_items
    SET quantity = $1
    WHERE order_id = $2 AND product_id = $3
    RETURNING *;
  `;
  const { rows } = await db.query(SQL, [qty, orderId, productId]);
  return rows[0] || null;
}

export async function deleteOrderItemByProduct(orderId, productId) {
  const SQL = `
    DELETE FROM order_items
    WHERE order_id = $1 AND product_id = $2
    RETURNING *;
  `;
  const { rows } = await db.query(SQL, [orderId, productId]);
  return rows[0] || null;
}
