const API_URL = "/api";

function headers(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
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

/**
 * returns an array of orders for logged-in user
 */
export async function getMyOrders(token) {
  const res = await fetch(`${API_URL}/orders`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to load orders"
    );
  return data;
}

/**
 * returns a single order
 */
export async function getOrderById(token, orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to load order"
    );
  return data;
}

/**
 * returns products for that order (order_items joined with products)
 */
export async function getOrderProducts(token, orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}/products`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string"
        ? data
        : data?.error || "Failed to load order products"
    );
  return data;
}

/**
 * returns a created order
 */
export async function createOrder(token, { date, note }) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ date, note }),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to create order"
    );
  return data;
}

/**
 * returns created order_items row
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
  if (!res.ok)
    throw new Error(
      typeof data === "string"
        ? data
        : data?.error || "Failed to add product to order"
    );
  return data;
}

// Add item to the active cart for a pet
export async function addItemToPetCart(token, petId, { productId, quantity }) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/cart/items`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string"
        ? data
        : data?.error || "Failed to add item to pet cart"
    );

  return data;
}

// Checkout the cart for a pet
export async function checkoutPetCart(token, petId) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/cart/checkout`, {
    method: "POST",
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string"
        ? data
        : data?.error || "Failed to checkout pet cart"
    );

  return data;
}

// Get order history for a pet
export async function getPetOrderHistory(token, petId) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/history`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string"
        ? data
        : data?.error || "Failed to load pet order history"
    );

  return data;
}
