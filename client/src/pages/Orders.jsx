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

        // Make sure it's an array before mapping
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
    <div style={{ padding: "1rem" }}>
      <h2>Orders Page</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>No orders yet. (Create one, then refresh.)</p>
      )}

      {!loading &&
        !error &&
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: "1rem",
              marginTop: "1rem",
            }}
          >
            <p>
              <strong>Order:</strong> {order.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {order.date ? new Date(order.date).toLocaleDateString() : "n/a"}
            </p>

            <strong>Items:</strong>
            {order.products?.length ? (
              <ul>
                {order.products.map((p) => (
                  <li key={`${order.id}-${p.product_id}`}>
                    {p.name} × {p.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>(No items)</p>
            )}
          </div>
        ))}
    </div>
  );
}
