import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useActivePet } from "./ActivePetContext";
import {
  getPetCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../api/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { activePet } = useActivePet();

  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function refreshCart() {
    if (!activePet?.id) {
      setCartData(null);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getPetCart(activePet.id);
      setCartData(data);
    } catch (err) {
      setError(err?.message || "Failed to load cart");
      setCartData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshCart();
  }, [activePet?.id]);

  const items = useMemo(() => {
    return Array.isArray(cartData?.items) ? cartData.items : [];
  }, [cartData]);

  const itemById = useMemo(() => {
    const m = new Map();
    for (const i of items) {
      const pid = Number(i.product_id ?? i.id);
      if (Number.isFinite(pid)) m.set(pid, i);
    }
    return m;
  }, [items]);

  const ids = useMemo(() => new Set([...itemById.keys()]), [itemById]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, i) => sum + Number(i.quantity || 0), 0);
  }, [items]);

  const orderTotal = useMemo(() => {
    if (cartData?.order_total != null) return Number(cartData.order_total);

    return items.reduce((sum, i) => {
      const qty = Number(i.quantity || 0);
      const unit = Number(i.item_price ?? i.price ?? 0);
      return sum + qty * unit;
    }, 0);
  }, [cartData, items]);

  function getQty(productId) {
    const pid = Number(productId);
    return Number(itemById.get(pid)?.quantity || 0);
  }

  async function addItem(product, qty = 1) {
    if (!activePet?.id) throw new Error("Select an active pet first.");
    const nextCart = await addToCart(activePet.id, product, qty);
    setCartData(nextCart);
    return nextCart;
  }

  async function setQty(productId, nextQty) {
    if (!activePet?.id) throw new Error("Select an active pet first.");
    const pid = Number(productId);
    const qty = Math.max(0, Number(nextQty || 0));

    let nextCart;
    if (qty === 0) {
      nextCart = await removeFromCart(activePet.id, pid);
    } else {
      nextCart = await updateQuantity(activePet.id, pid, qty);
    }

    setCartData(nextCart);
    return nextCart;
  }

  async function updateItemQty(productId, nextQty) {
    return setQty(productId, nextQty);
  }

  async function removeItem(productId) {
    if (!activePet?.id) throw new Error("Select an active pet first.");
    const nextCart = await removeFromCart(activePet.id, Number(productId));
    setCartData(nextCart);
    return nextCart;
  }

  async function clear() {
    if (!activePet?.id) throw new Error("Select an active pet first.");
    const nextCart = await clearCart(activePet.id);
    setCartData(nextCart);
    return nextCart;
  }

  const value = useMemo(
    () => ({
      cartData,
      items,
      ids,
      itemCount,
      orderTotal,
      loading,
      error,

      isInCart: (productId) => ids.has(Number(productId)),
      getQty,
      refreshCart,

      addItem,
      removeItem,
      updateItemQty,
      setQty,
      clear,
    }),
    [cartData, items, ids, itemCount, orderTotal, loading, error, itemById]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
