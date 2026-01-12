import { createContext, useContext, useMemo, useState } from "react";
import { getCart, addToCart as addToCartLS, saveCart } from "../api/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => getCart());

  function sync(nextCart) {
    // keep localStorage + state in sync
    saveCart(nextCart);
    setCart(nextCart);
  }

  function addItem(product, qty = 1) {
    const productId = Number(product.id);

    const existing = cart.find((i) => Number(i.productId) === productId);

    let nextCart;
    if (existing) {
      nextCart = cart.map((i) =>
        Number(i.productId) === productId
          ? { ...i, quantity: Number(i.quantity || 0) + Number(qty) }
          : i
      );
    } else {
      nextCart = [
        ...cart,
        {
          productId,
          name: product.name,
          price: Number(product.price),
          image_url: product.image_url,
          quantity: Number(qty),
        },
      ];
    }

    sync(nextCart);
    return nextCart;
  }

  function removeItem(productId) {
    const pid = Number(productId);
    const nextCart = cart.filter((i) => Number(i.productId) !== pid);
    sync(nextCart);
  }

  function updateItemQty(productId, nextQty) {
    const pid = Number(productId);
    const qty = Number(nextQty);

    const nextCart = cart
      .map((item) =>
        Number(item.productId) === pid ? { ...item, quantity: qty } : item
      )
      .filter((item) => Number(item.quantity) > 0);

    sync(nextCart);
  }

  function clear() {
    sync([]);
  }

  const value = useMemo(() => {
    const ids = new Set(cart.map((i) => Number(i.productId)));
    return {
      cart,
      ids,
      isInCart: (productId) => ids.has(Number(productId)),
      addItem,
      removeItem,
      updateItemQty,
      clear,
    };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
