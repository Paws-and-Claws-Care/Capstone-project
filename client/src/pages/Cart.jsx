import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useActivePet } from "../context/ActivePetContext";
import { useCart } from "../context/CartContext";

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

  const displayTotal = useMemo(() => Number(orderTotal || 0), [orderTotal]);

  const needsPet = !activePet?.id;

  useEffect(() => {
    if (location.pathname !== "/cart") return;
    if (needsPet) return;

    refreshCart?.();
  }, [location.pathname, activePet?.id]);

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

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="mb-2">My Cart</h2>

      <div className="text-muted mb-4">
        Pet: <strong>{activePet ? activePet.name : "None selected"}</strong>
      </div>

      {needsPet && (
        <div className="alert alert-warning">
          Select an active pet to view its cart.
        </div>
      )}

      {loading && <div className="alert alert-secondary">Loading cart…</div>}

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
          <Link className="btn btn-primary btn-sm ms-2" to="/products">
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

            <div className="d-flex justify-content-end mt-3">
              <div className="fw-semibold fs-5">
                Total: ${Number(displayTotal).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
