import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getUser } from "../api/auth";
import { getCart, removeFromCart } from "../api/cart";

export default function Cart() {
  const user = getUser();
  const [cart, setCart] = useState([]);

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    setCart(getCart());
  }, []);

  function removeItem(productId) {
    const updated = removeFromCart(productId);
    setCart(updated);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            {cart.map((item, idx) => (
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
                  <div className="text-muted">
                    ${Number(item.price).toFixed(2)}× {item.quantity}
                  </div>
                </div>

                <div className="fw-bold me-3">
                  ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </div>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))}
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
