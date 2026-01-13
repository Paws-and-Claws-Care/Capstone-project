import { useEffect, useMemo, useState } from "react";
import { getMyOrders, getOrderProducts } from "../api/orders";

function isCartOrder(order) {
  // Try common patterns first
  const status = (order?.status ?? order?.state ?? "").toString().toLowerCase();
  if (status)
    return status === "cart" || status === "open" || status === "pending";

  if (typeof order?.is_cart === "boolean") return order.is_cart;
  if (typeof order?.isCart === "boolean") return order.isCart;

  // Fallback: many projects only set date when "placed"
  // If your backend ALWAYS has a date, this fallback won't matter.
  return !order?.date;
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function load() {
      setLoading(true);
      setError("");

      if (!token) {
        setOrders([]);
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const ordersData = await getMyOrders(token);
        const safeOrders = Array.isArray(ordersData) ? ordersData : [];

        const withProductsAndTotals = await Promise.all(
          safeOrders.map(async (o) => {
            try {
              // ✅ backend now returns: { order_id, items, order_total }
              const data = await getOrderProducts(token, o.id);

              return {
                ...o,
                products: Array.isArray(data?.items) ? data.items : [],
                order_total: Number(data?.order_total ?? 0),
              };
            } catch (err) {
              console.error("Failed to load products for order:", o.id, err);
              return { ...o, products: [], order_total: 0 };
            }
          })
        );

        setOrders(withProductsAndTotals);
      } catch (err) {
        console.error("Orders load error:", err);
        setError(err.message || "Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const { cartOrders, placedOrders } = useMemo(() => {
    const cartOrders = [];
    const placedOrders = [];
    for (const o of orders) {
      if (isCartOrder(o)) cartOrders.push(o);
      else placedOrders.push(o);
    }
    return { cartOrders, placedOrders };
  }, [orders]);

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="mb-4">My Orders</h2>

      {loading && <div className="alert alert-secondary">Loading orders…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* CART SECTION */}
      {!loading && !error && cartOrders.length > 0 && (
        <>
          <h4 className="mb-3">Current Cart</h4>

          {cartOrders.map((order) => (
            <div className="card mb-4 border-warning" key={order.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">Cart #{order.id}</h5>
                  <span className="badge bg-warning text-dark">Open</span>
                </div>

                <hr />

                <h6>Items</h6>

                {order.products?.length ? (
                  <>
                    <ul className="list-group list-group-flush">
                      {order.products.map((p) => (
                        <li
                          key={`${order.id}-${p.product_id}`}
                          className="list-group-item d-flex justify-content-between"
                        >
                          <span>{p.name}</span>
                          <span className="text-muted">× {p.quantity}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ✅ Optional: show order total */}
                    <div className="mt-3 fw-semibold">
                      Total: ${Number(order.order_total ?? 0).toFixed(2)}
                    </div>
                  </>
                ) : (
                  <p className="text-muted">(No items)</p>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {/* PLACED ORDERS SECTION */}
      {!loading && !error && placedOrders.length === 0 && (
        <div className="alert alert-info">
          You haven’t placed any orders yet.
        </div>
      )}

      {!loading &&
        !error &&
        placedOrders.map((order) => (
          <div className="card mb-4" key={order.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Order #{order.id}</h5>
                <span className="text-muted">
                  {order.date
                    ? new Date(order.date).toLocaleDateString()
                    : "n/a"}
                </span>
              </div>

              <hr />

              <h6>Items</h6>

              {order.products?.length ? (
                <>
                  <ul className="list-group list-group-flush">
                    {order.products.map((p) => (
                      <li
                        key={`${order.id}-${p.product_id}`}
                        className="list-group-item d-flex justify-content-between"
                      >
                        <span>{p.name}</span>
                        <span className="text-muted">× {p.quantity}</span>
                      </li>
                    ))}
                  </ul>

                  {/* ✅ Optional: show order total */}
                  <div className="mt-3 fw-semibold">
                    Total: ${Number(order.order_total ?? 0).toFixed(2)}
                  </div>
                </>
              ) : (
                <p className="text-muted">(No items)</p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
