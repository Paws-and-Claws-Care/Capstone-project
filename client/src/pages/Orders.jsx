import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders, getOrderProducts } from "../api/orders";

function isCartOrder(order) {
  const status = (order?.status ?? order?.state ?? "").toString().toLowerCase();
  if (status)
    return status === "cart" || status === "open" || status === "pending";

  if (typeof order?.is_cart === "boolean") return order.is_cart;
  if (typeof order?.isCart === "boolean") return order.isCart;

  return !order?.date;
}

export default function Orders() {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

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

        const withProductsAndTotals = await Promise.all(
          placedOnly.map(async (o) => {
            try {
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

        withProductsAndTotals.sort((a, b) => {
          const ad = a.date ? new Date(a.date).getTime() : 0;
          const bd = b.date ? new Date(b.date).getTime() : 0;
          if (bd !== ad) return bd - ad;
          return Number(b.id) - Number(a.id);
        });

        setPlacedOrders(withProductsAndTotals);
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

  const hasPlacedOrders = useMemo(
    () => placedOrders.length > 0,
    [placedOrders]
  );

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">My Orders</h2>

        <Link to="/cart" className="btn btn-outline-primary btn-sm">
          View Cart
        </Link>
      </div>

      {loading && <div className="alert alert-secondary">Loading orders…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && !hasPlacedOrders && (
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
