import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useActivePet } from "../context/ActivePetContext";
import {
  getMyOrders,
  getOrderProducts,
  updatePetCartItem,
  removePetCartItem,
} from "../api/orders";

function isCartOrder(order) {
  const status = (order?.status ?? order?.state ?? "").toString().toLowerCase();
  if (status)
    return status === "cart" || status === "open" || status === "pending";

  if (typeof order?.is_cart === "boolean") return order.is_cart;
  if (typeof order?.isCart === "boolean") return order.isCart;

  return !order?.date;
}

function getOrderPetId(order) {
  return order?.pet_id ?? order?.petId ?? order?.petID ?? null;
}

export default function Cart() {
  const navigate = useNavigate();
  const { activePet } = useActivePet();

  const [cartOrder, setCartOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Track per-item button loading so UI doesn't feel glitchy
  const [busyByProductId, setBusyByProductId] = useState({});

  async function loadCart() {
    const token = localStorage.getItem("token");

    setLoading(true);
    setError("");
    setCartOrder(null);

    if (!token) {
      setLoading(false);
      setError("Please log in to view your cart.");
      return;
    }

    if (!activePet?.id) {
      setLoading(false);
      setError("Select an active pet to view its cart.");
      return;
    }

    try {
      const ordersData = await getMyOrders(token);
      const safeOrders = Array.isArray(ordersData) ? ordersData : [];

      // Find the cart/open order for the ACTIVE PET
      const petCart = safeOrders.find((o) => {
        if (!isCartOrder(o)) return false;
        const pid = getOrderPetId(o);
        return pid ? Number(pid) === Number(activePet.id) : true;
      });

      if (!petCart) {
        // Keep same shape your UI expects
        setCartOrder({ products: [], id: null, order_total: 0 });
        return;
      }

      // backend returns: { order_id, items, order_total }
      const data = await getOrderProducts(token, petCart.id);

      setCartOrder({
        ...petCart,
        products: Array.isArray(data?.items) ? data.items : [],
        order_total: Number(data?.order_total ?? 0),
      });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePet?.id]);

  const itemCount = useMemo(() => {
    return (cartOrder?.products || []).reduce(
      (sum, p) => sum + Number(p.quantity || 0),
      0
    );
  }, [cartOrder]);

  // Fallback total (in case backend order_total is missing for any reason)
  const computedTotal = useMemo(() => {
    return (cartOrder?.products || []).reduce((sum, p) => {
      const qty = Number(p.quantity || 0);

      // prefer line_total from backend, else compute from item_price
      const line =
        p.line_total != null
          ? Number(p.line_total)
          : qty * Number(p.item_price ?? 0);

      return sum + (Number.isFinite(line) ? line : 0);
    }, 0);
  }, [cartOrder]);

  const displayTotal =
    cartOrder?.order_total != null
      ? Number(cartOrder.order_total)
      : computedTotal;

  async function changeQty(productId, nextQty) {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in again.");
      return;
    }
    if (!activePet?.id) {
      setError("Select an active pet first.");
      return;
    }

    try {
      setBusyByProductId((m) => ({ ...m, [productId]: true }));
      setError("");

      // nextQty can be 0 -> our PATCH route deletes when quantity === 0
      await updatePetCartItem(token, activePet.id, productId, nextQty);

      await loadCart();
    } catch (err) {
      setError(err?.message || "Failed to update quantity");
    } finally {
      setBusyByProductId((m) => ({ ...m, [productId]: false }));
    }
  }

  async function removeItem(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in again.");
      return;
    }
    if (!activePet?.id) {
      setError("Select an active pet first.");
      return;
    }

    try {
      setBusyByProductId((m) => ({ ...m, [productId]: true }));
      setError("");

      await removePetCartItem(token, activePet.id, productId);

      await loadCart();
    } catch (err) {
      setError(err?.message || "Failed to remove item");
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

      {loading && <div className="alert alert-secondary">Loading cart…</div>}

      {error && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          <span>{error}</span>
          {error.toLowerCase().includes("log in") && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      )}

      {!loading &&
        !error &&
        (!cartOrder || cartOrder.products?.length === 0) && (
          <div className="alert alert-info">
            Your cart is empty.{" "}
            <Link className="btn btn-primary btn-sm ms-2" to="/products">
              Browse Products
            </Link>
          </div>
        )}

      {!loading && !error && cartOrder?.products?.length > 0 && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Cart Items</h5>
              <span className="text-muted">{itemCount} item(s)</span>
            </div>

            <hr />

            <ul className="list-group list-group-flush">
              {cartOrder.products.map((p) => {
                const productId = p.product_id ?? p.id; // depends on your API shape
                const busy = Boolean(busyByProductId[productId]);

                const unit = Number(p.item_price ?? p.price ?? 0);

                return (
                  <li
                    key={`${cartOrder.id}-${productId}`}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="me-3">
                      <div className="fw-semibold">{p.name}</div>

                      {/* ✅ Only show item price under the name */}
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
                        onClick={() => removeItem(productId)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* ✅ Total */}
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
