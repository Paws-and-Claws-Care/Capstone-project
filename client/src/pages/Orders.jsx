import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyOrders, getOrderProducts, reorderOrder } from "../api/orders";
import { getToken } from "../api/auth";
import { useActivePet } from "../context/ActivePetContext";
import { useCart } from "../context/CartContext";

function isCartOrder(order) {
  const status = (order?.status ?? order?.state ?? "").toString().toLowerCase();
  if (status)
    return status === "cart" || status === "open" || status === "pending";

  if (typeof order?.is_cart === "boolean") return order.is_cart;
  if (typeof order?.isCart === "boolean") return order.isCart;

  return !order?.date;
}

function money(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

export default function Orders() {
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  const { pets, activePetId, activePet } = useActivePet();
  const selectedPetId = activePet?.id ?? activePetId;

  const [placedOrders, setPlacedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reorderBusyId, setReorderBusyId] = useState(null);

  const petLabelById = useMemo(() => {
    const map = {};
    (pets || []).forEach((p) => {
      map[p.id] = `${p.name}${p.pet_type ? ` (${p.pet_type})` : ""}`;
    });
    return map;
  }, [pets]);

  useEffect(() => {
    const token = getToken();

    async function load() {
      setLoading(true);
      setError("");

      if (!token) {
        setPlacedOrders([]);
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const ordersData = await getMyOrders(token);
        const safeOrders = Array.isArray(ordersData) ? ordersData : [];
        const placedOnly = safeOrders.filter((o) => !isCartOrder(o));

        const withProducts = await Promise.all(
          placedOnly.map(async (o) => {
            try {
              const { items, order_total } = await getOrderProducts(
                token,
                o.id
              );
              return {
                ...o,
                products: Array.isArray(items) ? items : [],
                order_total: Number(order_total ?? 0),
              };
            } catch (err) {
              console.error("Failed to load products for order:", o.id, err);
              return { ...o, products: [], order_total: 0 };
            }
          })
        );

        // newest first (like your screenshot)
        withProducts.sort((a, b) => {
          const ad = a.date ? new Date(a.date).getTime() : 0;
          const bd = b.date ? new Date(b.date).getTime() : 0;
          if (bd !== ad) return bd - ad;
          return Number(b.id) - Number(a.id);
        });

        setPlacedOrders(withProducts);
      } catch (err) {
        console.error("Orders load error:", err);
        setError(err?.message || "Failed to load orders");
        setPlacedOrders([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleReorder(orderId) {
    const token = getToken();
    if (!token) {
      alert("Please log in again.");
      return;
    }

    if (!selectedPetId) {
      alert("Select a pet first to reorder.");
      return;
    }

    try {
      setReorderBusyId(orderId);
      setError("");

      await reorderOrder(token, orderId, selectedPetId);

      await refreshCart();
      navigate("/cart");
    } catch (err) {
      console.error("Reorder failed:", err);
      alert(err?.message || "Could not reorder.");
    } finally {
      setReorderBusyId(null);
    }
  }

  const hasPlacedOrders = placedOrders.length > 0;

  return (
    <div
      className="d-flex flex-column"
      style={{ minHeight: "calc(100vh - var(--navbar-height))" }}
    >
      <main className="container mt-5" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">My Orders</h2>

          <Link to="/cart" className="btn btn-outline-primary btn-sm">
            View Cart
          </Link>
        </div>

        {loading && (
          <div className="alert alert-secondary">Loading orders…</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && !placedOrders.length && (
          <div className="alert alert-info">
            You haven’t placed any orders yet.
          </div>
        )}

        {!loading &&
          !error &&
          placedOrders.map((order, index) => {
            const displayNumber = placedOrders.length - index;

            return (
              <div className="card mb-4" key={order.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h5 className="card-title mb-0">
                        Order #{displayNumber}
                      </h5>
                      <div className="text-muted small">
                        For{" "}
                        {petLabelById[order.pet_id] ?? `Pet #${order.pet_id}`}
                      </div>
                    </div>

                    <span className="text-muted">
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "n/a"}
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Items</h6>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      disabled={!selectedPetId || reorderBusyId === order.id}
                      onClick={() => handleReorder(order.id)}
                      title={
                        !selectedPetId
                          ? "Select a pet to reorder"
                          : "Reorder this order"
                      }
                    >
                      {reorderBusyId === order.id ? "Reordering..." : "Reorder"}
                    </button>
                  </div>

                  {order.products?.length ? (
                    <>
                      <ul className="list-group list-group-flush">
                        {order.products.map((p) => {
                          const qty = Number(p.quantity || 0);
                          const unitPrice =
                            p.price_at_purchase ?? p.item_price ?? p.price ?? 0;

                          return (
                            <li
                              key={`${order.id}-${
                                p.product_id ?? p.id ?? p.name
                              }`}
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <div className="fw-semibold">{p.name}</div>
                              <div className="text-muted">
                                ${money(unitPrice)} × {qty}
                              </div>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="mt-3 fw-semibold">
                        Total: ${money(order.order_total)}
                      </div>
                    </>
                  ) : (
                    <p className="text-muted">(No items)</p>
                  )}
                </div>
              </div>
            );
          })}
      </main>

      {/* FOOTER */}
      <footer className="w-100 bg-light border-top mt-auto">
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
