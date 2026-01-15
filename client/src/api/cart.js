import { getToken } from "./auth";

const API = "/api";

async function apiFetch(path, options = {}) {
  const token = getToken() || localStorage.getItem("token");
  if (!token) throw new Error("Login to use your cart");

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text };
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || "Request failed";
    throw new Error(msg);
  }

  return data;
}

export async function getPetCart(petId) {
  if (!petId) throw new Error("petId is required");

  const orders = await apiFetch("/orders");

  const cart = (Array.isArray(orders) ? orders : []).find(
    (o) => o.is_cart === true && Number(o.pet_id) === Number(petId)
  );

  if (!cart) {
    return {
      order_id: null,
      pet_id: Number(petId),
      items: [],
      order_total: 0,
    };
  }

  const cartData = await apiFetch(`/orders/${cart.id}/products`);

  return { ...cartData, pet_id: Number(petId) };
}

export async function addToCart(petId, product, qty = 1) {
  if (!petId) throw new Error("Select an active pet to add items to your cart");
  if (!product?.id) throw new Error("product.id is required");

  await apiFetch(`/orders/pets/${petId}/cart/items`, {
    method: "POST",
    body: JSON.stringify({
      productId: Number(product.id),
      quantity: Number(qty),
    }),
  });

  return getPetCart(petId);
}

export async function updateQuantity(petId, productId, nextQty) {
  if (!petId) throw new Error("petId is required");
  if (!productId) throw new Error("productId is required");

  await apiFetch(`/orders/pets/${petId}/cart/items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity: Number(nextQty) }),
  });

  return getPetCart(petId);
}

export async function changeQuantity(petId, productId, delta) {
  if (!petId) throw new Error("petId is required");

  const cart = await getPetCart(petId);
  const items = Array.isArray(cart?.items) ? cart.items : [];

  const pid = Number(productId);
  const item = items.find((i) => Number(i.product_id ?? i.id) === pid);

  const currentQty = Number(item?.quantity || 0);
  const nextQty = currentQty + Number(delta);

  return updateQuantity(petId, pid, nextQty);
}

export async function removeFromCart(petId, productId) {
  if (!petId) throw new Error("petId is required");
  if (!productId) throw new Error("productId is required");

  await apiFetch(`/orders/pets/${petId}/cart/items/${productId}`, {
    method: "DELETE",
  });

  return getPetCart(petId);
}

export async function clearCart(petId) {
  if (!petId) throw new Error("petId is required");

  const cart = await getPetCart(petId);
  const items = Array.isArray(cart?.items) ? cart.items : [];

  await Promise.all(
    items.map((i) => {
      const pid = Number(i.product_id ?? i.id);
      return apiFetch(`/orders/pets/${petId}/cart/items/${pid}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: 0 }),
      });
    })
  );

  return getPetCart(petId);
}
