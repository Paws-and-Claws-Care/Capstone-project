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

export async function getMyOrders(token) {
  const res = await fetch(`${API_URL}/orders`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to load orders");
  return data;
}

export async function getOrderProducts(token, orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}/products`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to load order products");

  return data;
}

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

export async function addItemToPetCart(token, petId, { productId, quantity }) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/cart/items`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to add item to pet cart");
  return data;
}

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

export async function checkoutPetCart(token, petId) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/cart/checkout`, {
    method: "POST",
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to checkout pet cart");
  return data;
}

export async function getPetOrderHistory(token, petId) {
  const res = await fetch(`${API_URL}/orders/pets/${petId}/history`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok) throw toError(data, "Failed to load pet order history");
  return data;
}
