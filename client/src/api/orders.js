// client/src/api/orders.js
const API_URL = "/api";

function headers(token) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}

function toError(data, fallback) {
  return new Error(
    typeof data === "string" ? data : data?.error || data?.message || fallback
  );
}

/**
 * GET /api/orders
 * returns an array of orders for logged-in user
 */
export async function getMyOrders(token) {
  const res = await fetch(`${API_URL}/orders`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to load orders");
  return data;
}

/**
 * ⚠️ NOTE:
 * Your rewritten backend orders router does NOT include:
 * GET /api/orders/:id
 * So we remove getOrderById() on the frontend to avoid 404s.
 * If you want it later, add that route on the backend first.
 */

/**
 * GET /api/orders/:id/products
 * returns products for that order (order_items joined with products)
 * Backend shape: { order_id, items, order_total }
 */
export async function getOrderProducts(token, orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}/products`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to load order products");

  // { order_id, items, order_total }
  return data;
}

/**
 * POST /api/orders
 * Create an order (generic)
 * Backend expects: { date?, pet_id, is_cart? }
 * Backend defaults date if missing, but still requires pet_id.
 */
export async function createOrder(token, { date, pet_id, is_cart }) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ date, pet_id, is_cart }),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to create order");
  return data;
}

/**
 * POST /api/orders/:id/products
 * Add product to a specific order (generic)
 * Body: { productId, quantity }
 */
export async function addProductToOrder(
  token,
  orderId,
  { productId, quantity }
) {
  const res = await fetch(`${API_URL}/orders/${orderId}/products`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to add product to order");
  return data;
}

/**
 * POST /api/orders/pets/:petId/cart/items
 * Add item to the active cart for a pet
 * Body: { productId, quantity }
 * Returns: { order, added }
 */
export async function addItemToPetCart(token, petId, { productId, quantity }) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/cart/items`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to add item to pet cart");
  return data; // { order, added }
}

/**
 * PATCH /api/orders/pets/:petId/cart/items/:productId
 * Update quantity for a cart item (quantity 0 deletes)
 * Body: { quantity }
 * Returns: { orderId, updated } OR { orderId, removed }
 */
export async function updatePetCartItem(token, petId, productId, quantity) {
  const res = await fetch(
    `${API_URL}/orders/pets/${petId}/cart/items/${productId}`,
    {
      method: "PATCH",
      headers: headers(token),
      body: JSON.stringify({ quantity }),
    }
  );

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to update item");
  return data;
}

/**
 * DELETE /api/orders/pets/:petId/cart/items/:productId
 * Remove an item from pet cart
 * Returns: { orderId, removed }
 */
export async function removePetCartItem(token, petId, productId) {
  const res = await fetch(
    `${API_URL}/orders/pets/${petId}/cart/items/${productId}`,
    {
      method: "DELETE",
      headers: headers(token),
    }
  );

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to remove item");
  return data;
}

/**
 * POST /api/orders/pets/:petId/cart/checkout
 * Checkout the cart for a pet
 * Returns: updated order row
 */
export async function checkoutPetCart(token, petId) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/cart/checkout`, {
    method: "POST",
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to checkout pet cart");
  return data;
}

/**
 * GET /api/orders/pets/:petId/history
 * Get order history for a pet
 * Returns: [{ order_id, date, items: [...] }, ...]
 */
export async function getPetOrderHistory(token, petId) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/history`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to load pet order history");
  return data;
}
