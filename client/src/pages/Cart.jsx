import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useActivePet } from "../context/ActivePetContext";
import { useCart } from "../context/CartContext";

// ✅ ADDED (for checkout)
import { checkoutPetCart } from "../api/orders";
import { getToken } from "../api/auth";

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activePet } = useActivePet();

  const {
    items,
    itemCount,
    orderTotal,
    loading,
    error,
    updateItemQty,
    removeItem,
    refreshCart,
  } = useCart();

  const [busyByProductId, setBusyByProductId] = useState({});

  // ✅ ADDED (prevents double checkout later)
  const [checkoutBusy, setCheckoutBusy] = useState(false);

  const displayTotal = useMemo(() => Number(orderTotal || 0), [orderTotal]);

  const needsPet = !activePet?.id;

  useEffect(() => {
    if (location.pathname !== "/cart") return;
    if (needsPet) return;

    refreshCart?.();
  }, [location.pathname, activePet?.id]);

  function getBrowseProductsRoute() {
    const petType = (activePet?.pet_type ?? "").toLowerCase();
    if (petType === "dog") return "/products?petType=dog";
    if (petType === "cat") return "/products?petType=cat";
    return "/products";
  }

  async function changeQty(productId, nextQty) {
    try {
      setBusyByProductId((m) => ({ ...m, [productId]: true }));
      await updateItemQty(productId, nextQty);
      await refreshCart();
    } catch (err) {
      alert(err?.message || "Failed to update quantity");
    } finally {
      setBusyByProductId((m) => ({ ...m, [productId]: false }));
    }
  }

  async function handleRemove(productId) {
    try {
      setBusyByProductId((m) => ({ ...m, [productId]: true }));
      await removeItem(productId);
      await refreshCart();
    } catch (err) {
      alert(err?.message || "Failed to remove item");
    } finally {
      setBusyByProductId((m) => ({ ...m, [productId]: false }));
    }
  }

  // ✅ ADDED (this will be called by the button we add next)
  async function handleCheckout() {
    if (!activePet?.id) return;

    try {
      setCheckoutBusy(true);

      const token = getToken();
      const result = await checkoutPetCart(token, activePet.id);

      // refresh cart after checkout (backend should create a new cart)
      await refreshCart();

      // supports either backend response shape
      const orderId = result?.completedOrder?.id ?? result?.id;

      // optional: go to confirmation page (already routed in App.jsx)
      if (orderId) navigate(`/orders/confirmation/${orderId}`);
    } catch (err) {
      console.error(err);
      alert(err?.message || "Checkout failed");
    } finally {
      setCheckoutBusy(false);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* PAGE CONTENT */}
      <div className="flex-grow-1">
        <div className="container mt-5" style={{ maxWidth: "900px" }}>
          <h2 className="mb-2">
            {activePet?.name ? `${activePet.name}'s Cart` : "Your Cart"}
          </h2>

          {needsPet && (
            <div className="alert alert-warning">
              Select an active pet to view its cart.
            </div>
          )}

          {loading && (
            <div className="alert alert-secondary">Loading cart…</div>
          )}

          {error && (
            <div className="alert alert-warning d-flex justify-content-between align-items-center">
              <span>{error}</span>
              {error.toLowerCase().includes("log in") && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate("/login")}
                  type="button"
                >
                  Login
                </button>
              )}
            </div>
          )}

          {!needsPet && !loading && !error && items.length === 0 && (
            <div className="alert alert-info">
              Your cart is empty.{" "}
              <Link
                className="btn btn-primary btn-sm ms-2"
                to={getBrowseProductsRoute()}
              >
                Browse Products
              </Link>
            </div>
          )}

          {!needsPet && !loading && !error && items.length > 0 && (
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Cart Items</h5>
                  <span className="text-muted">{itemCount} item(s)</span>
                </div>

                <hr />

                <ul className="list-group list-group-flush">
                  {items.map((p) => {
                    const productId = p.product_id ?? p.id;
                    const busy = Boolean(busyByProductId[productId]);
                    const unit = Number(p.item_price ?? p.price ?? 0);

                    return (
                      <li
                        key={productId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="me-3">
                          <div className="fw-semibold">{p.name}</div>
                          <div className="text-muted small">
                            ${Number(unit).toFixed(2)}
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={busy || Number(p.quantity) <= 1}
                            onClick={() =>
                              changeQty(productId, Number(p.quantity) - 1)
                            }
                            type="button"
                          >
                            −
                          </button>

                          <span style={{ minWidth: 24, textAlign: "center" }}>
                            {p.quantity}
                          </span>

                          <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={busy}
                            onClick={() =>
                              changeQty(productId, Number(p.quantity) + 1)
                            }
                            type="button"
                          >
                            +
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger ms-2"
                            disabled={busy}
                            onClick={() => handleRemove(productId)}
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="d-flex justify-content-end align-items-center mt-3 gap-2">
                  <div className="fw-semibold fs-5 me-auto">
                    Total: ${Number(displayTotal).toFixed(2)}
                  </div>

                  <button
                    className="btn btn-success"
                    disabled={checkoutBusy}
                    onClick={handleCheckout}
                    type="button"
                  >
                    {checkoutBusy ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER (FULL WIDTH) */}
      <footer className="w-100 bg-light border-top mt-5">
        <div className="container-fluid px-4 py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
            <div>© {new Date().getFullYear()} Paws & Claws Care</div>

            <div className="d-flex gap-3">
              <Link className="text-secondary text-decoration-none" to="/">
                Home
              </Link>

              <Link className="text-secondary text-decoration-none" to="/forum">
                Forum
              </Link>

              <Link className="text-secondary text-decoration-none" to="/about">
                About
              </Link>
              <Link
                className="text-secondary text-decoration-none"
                to="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
