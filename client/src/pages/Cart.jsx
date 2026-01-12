import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { getUser } from "../api/auth";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const user = getUser();

  // ✅ use context as the source of truth
  const { cart, updateItemQty, removeItem } = useCart();

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" replace />;

  function dec(productId, currentQty) {
    updateItemQty(productId, Number(currentQty) - 1);
  }

  function inc(productId, currentQty) {
    updateItemQty(productId, Number(currentQty) + 1);
  }

  function removeLine(productId) {
    removeItem(productId);
  }

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );
  }, [cart]);

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <h2 className="mb-4">My Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty.
          <div className="mt-3">
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="list-group mb-4">
            {cart.map((item, idx) => {
              const price = Number(item.price) || 0;
              const qty = Number(item.quantity) || 0;
              const lineTotal = price * qty;

              return (
                <div
                  key={`${item.productId ?? "noid"}-${idx}`}
                  className="list-group-item d-flex align-items-center gap-3"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />

                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <div className="text-muted">${price.toFixed(2)}</div>
                  </div>

                  {/* Quantity controls */}
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => dec(item.productId, qty)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span style={{ minWidth: 28, textAlign: "center" }}>
                      {qty}
                    </span>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => inc(item.productId, qty)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div
                    className="fw-bold ms-3"
                    style={{ minWidth: 90, textAlign: "right" }}
                  >
                    ${lineTotal.toFixed(2)}
                  </div>

                  {/* Remove whole line item */}
                  <button
                    className="btn btn-sm btn-outline-danger ms-3"
                    onClick={() => removeLine(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* SUMMARY */}
          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Total</h5>
              <h5 className="mb-0">${total.toFixed(2)}</h5>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/products" className="btn btn-outline-secondary">
              Continue Shopping
            </Link>

            <button className="btn btn-success" disabled>
              Checkout (Coming Soon)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
