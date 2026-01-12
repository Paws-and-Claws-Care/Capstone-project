const CART_KEY = "cart";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const productId = Number(product.id);

  const existing = cart.find((i) => Number(i.productId) === productId);

  if (existing) {
    existing.quantity = Number(existing.quantity || 0) + Number(qty);
  } else {
    cart.push({
      productId,
      name: product.name,
      price: Number(product.price),
      image_url: product.image_url,
      quantity: Number(qty),
    });
  }

  saveCart(cart);
  return cart;
}

// sets quantity to an exact number
export function updateQuantity(productId, nextQty) {
  const pid = Number(productId);
  const qty = Number(nextQty);

  const cart = getCart()
    .map((item) => {
      if (Number(item.productId) !== pid) return item;
      return { ...item, quantity: qty };
    })
    .filter((item) => Number(item.quantity) > 0); // remove if 0 or less

  saveCart(cart);
  return cart;
}

// +1 / -1 convenience
export function changeQuantity(productId, delta) {
  const pid = Number(productId);
  const d = Number(delta);

  const cart = getCart();
  const item = cart.find((i) => Number(i.productId) === pid);

  if (!item) return cart;

  const nextQty = Number(item.quantity || 0) + d;

  const updated =
    nextQty <= 0
      ? cart.filter((i) => Number(i.productId) !== pid)
      : cart.map((i) =>
          Number(i.productId) === pid ? { ...i, quantity: nextQty } : i
        );

  saveCart(updated);
  return updated;
}

export function removeFromCart(productId) {
  const pid = Number(productId);
  const updated = getCart().filter((i) => Number(i.productId) !== pid);
  saveCart(updated);
  return updated;
}

export function clearCart() {
  saveCart([]);
  return [];
}
