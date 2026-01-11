import { useEffect, useState } from "react";
import { getMyOrders, getOrderProducts } from "../api/orders";

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

        const withProducts = await Promise.all(
          safeOrders.map(async (o) => {
            try {
              const products = await getOrderProducts(token, o.id);
              return { ...o, products };
            } catch (err) {
              console.error("Failed to load products for order:", o.id, err);
              return { ...o, products: [] };
            }
          })
        );

        setOrders(withProducts);
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

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="mb-4">My Orders</h2>

      {loading && <div className="alert alert-secondary">Loading orders…</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className="alert alert-info">
          You haven’t placed any orders yet.
        </div>
      )}

      {!loading &&
        !error &&
        orders.map((order) => (
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
              ) : (
                <p className="text-muted">(No items)</p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
