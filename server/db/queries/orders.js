import db from "../client.js";

/**
 * ORDERS
 * - is_cart = true  => active cart for a pet (date should be NULL)
 * - is_cart = false => completed/placed order (date set at checkout)
 *
 * NOTE:
 * - order_items.price_at_purchase stores the snapshot price.
 */

export async function createOrder({
  user_id,
  pet_id,
  date = null,
  is_cart = true,
}) {
  const SQL = `
    INSERT INTO orders (user_id, pet_id, date, is_cart)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const { rows } = await db.query(SQL, [user_id, pet_id, date, is_cart]);
  return rows[0];
}

export async function getOrdersByUserId(user_id) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE user_id = $1
    ORDER BY id DESC;
  `;
  const { rows } = await db.query(SQL, [user_id]);
  return rows;
}

export async function getOrderById(id) {
  const SQL = `
    SELECT id, date, user_id, pet_id, is_cart
    FROM orders
    WHERE id = $1;
  `;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}

export async function getOrdersByProductIdForUser(productId, userId) {
  const SQL = `
    SELECT o.*
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    WHERE oi.product_id = $1
      AND o.user_id = $2
    ORDER BY o.id DESC;
  `;
  const { rows } = await db.query(SQL, [productId, userId]);
  return rows;
}

/**
 * CART HELPERS
 */

export async function getCartOrderByPet(userId, petId) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE user_id = $1
      AND pet_id = $2
      AND is_cart = true
    ORDER BY id DESC
    LIMIT 1;
  `;
  const { rows } = await db.query(SQL, [userId, petId]);
  return rows[0];
}

/**
 * Create a NEW empty cart for a pet.
 * IMPORTANT: do NOT set date here. Carts should keep date = NULL.
 */
export async function createCartOrderForPet(user_id, pet_id) {
  const SQL = `
    INSERT INTO orders (user_id, pet_id, is_cart)
    VALUES ($1, $2, true)
    RETURNING *;
  `;
  const { rows } = await db.query(SQL, [user_id, pet_id]);
  return rows[0];
}

/**
 * COMPLETED ORDERS (with item snapshot price)
 * Returns one row per item.
 */
export async function getCompletedOrdersByPet(userId, petId) {
  const SQL = `
    SELECT
      o.id AS order_id,
      o.date,
      o.pet_id,
      oi.id AS order_item_id,
      oi.quantity,
      oi.price_at_purchase,
      p.id AS product_id,
      p.name,
      p.image_url
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    WHERE o.user_id = $1
      AND o.pet_id = $2
      AND o.is_cart = false
    ORDER BY o.date DESC NULLS LAST, o.id DESC;
  `;
  const { rows } = await db.query(SQL, [userId, petId]);
  return rows;
}

/**
 * CHECKOUT
 * Marks cart as completed and sets date at checkout time.
 */
export async function checkoutCartOrder(orderId) {
  const SQL = `
    UPDATE orders
    SET is_cart = false,
        date = CURRENT_DATE
    WHERE id = $1
      AND is_cart = true
    RETURNING *;
  `;
  const { rows } = await db.query(SQL, [orderId]);
  return rows[0];
}

/**
 * ORDER ITEMS
 * - Always use oi.price_at_purchase (snapshot)
 */

export async function getOrderItems(orderId) {
  const SQL = `
    SELECT
      oi.id AS order_item_id,
      oi.order_id,
      oi.product_id,
      oi.quantity,
      oi.price_at_purchase,
      p.name,
      p.image_url
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    WHERE oi.order_id = $1
    ORDER BY oi.id ASC;
  `;
  const { rows } = await db.query(SQL, [orderId]);
  return rows;
}

/**
 * Add item to order (cart) with snapshot price.
 * IMPORTANT: caller MUST provide priceAtPurchase (usually products.price).
 */
export async function addProductToOrder({
  orderId,
  productId,
  quantity,
  priceAtPurchase,
}) {
  const SQL = `
    INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (order_id, product_id)
    DO UPDATE SET
      quantity = order_items.quantity + EXCLUDED.quantity
    RETURNING *;
  `;

  const { rows } = await db.query(SQL, [
    orderId,
    productId,
    quantity,
    priceAtPurchase,
  ]);

  return rows[0];
}

/**
 * Replace quantity (sometimes useful for cart update)
 */
export async function setOrderItemQuantity({ orderId, productId, quantity }) {
  const SQL = `
    UPDATE order_items
    SET quantity = $3
    WHERE order_id = $1 AND product_id = $2
    RETURNING *;
  `;
  const { rows } = await db.query(SQL, [orderId, productId, quantity]);
  return rows[0];
}

/**
 * Remove item from cart
 */
export async function removeProductFromOrder({ orderId, productId }) {
  const SQL = `
    DELETE FROM order_items
    WHERE order_id = $1 AND product_id = $2
    RETURNING *;
  `;
  const { rows } = await db.query(SQL, [orderId, productId]);
  return rows[0];
}
