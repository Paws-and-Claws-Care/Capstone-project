const CART_KEY = "cart";

export function getCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

    // Normalize types so UI never crashes
    return Array.isArray(raw)
      ? raw.map((item) => ({
          ...item,
          productId: Number(item.productId),
          price: Number(item.price),
          quantity: Number(item.quantity) || 1,
        }))
      : [];
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
    existing.quantity = Number(existing.quantity) + qty;
    existing.price = Number(existing.price); // ✅ ensures it stays a number
  } else {
    cart.push({
      productId,
      name: product.name,
      price: Number(product.price),
      image_url: product.image_url,
      quantity: qty,
    });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const updated = getCart().filter((i) => i.productId !== productId);
  saveCart(updated);
  return updated;
}

export function clearCart() {
  saveCart([]);
}
