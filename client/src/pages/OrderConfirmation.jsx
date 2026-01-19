import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToken } from "../api/auth";
import { getOrderProducts, getMyOrders } from "../api/orders";
import { useActivePet } from "../context/ActivePetContext";

function formatMoney(n) {
  const num = Number(n ?? 0);
  return num.toFixed(2);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString();
}

function pickUnitPrice(item) {
  // ✅ prefer snapshot / backend-computed unit_price
  const raw =
    item?.unit_price ??
    item?.price_at_purchase ??
    item?.item_price ??
    item?.current_price ??
    item?.price ??
    0;

  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { activePet } = useActivePet();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [orderMeta, setOrderMeta] = useState(null); // { id, date, pet_id, is_cart }
  const [orderDetails, setOrderDetails] = useState(null); // { order_id, items, order_total }

  const numericOrderId = useMemo(() => Number(orderId), [orderId]);

  const petLabel = useMemo(() => {
    if (
      orderMeta?.pet_id &&
      activePet?.id &&
      Number(orderMeta.pet_id) === Number(activePet.id)
    ) {
      return `${activePet.name}${
        activePet.pet_type ? ` (${activePet.pet_type})` : ""
      }`;
    }
    if (orderMeta?.pet_id) return `Pet #${orderMeta.pet_id}`;
    return "";
  }, [orderMeta?.pet_id, activePet?.id, activePet?.name, activePet?.pet_type]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        if (!Number.isFinite(numericOrderId)) {
          throw new Error("Invalid order id.");
        }

        const token = getToken();
        if (!token) {
          navigate("/login");
          return;
        }

        // 1) items + totals (comes from GET /orders/:id/products)
        const details = await getOrderProducts(token, numericOrderId);

        // 2) order meta (date, pet_id) from user's orders list
        const orders = await getMyOrders(token);
        const found = (orders || []).find(
          (o) => Number(o.id) === numericOrderId
        );

        setOrderDetails(details);
        setOrderMeta(found || null);
      } catch (err) {
        setError(err?.message || "Failed to load order confirmation.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [numericOrderId, navigate]);

  if (loading) {
    return (
      <div className="container py-5" style={{ maxWidth: 900 }}>
        <div className="alert alert-secondary">Loading confirmation…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5" style={{ maxWidth: 900 }}>
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => navigate("/cart")}
            type="button"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  const items = orderDetails?.items || [];

  // ✅ trust backend total if provided; fallback to sum lines
  const computedTotal = items.reduce((sum, item) => {
    const qty = Number(item?.quantity ?? 0);
    const unit = pickUnitPrice(item);
    const line = Number(item?.line_total ?? unit * qty);
    return sum + (Number.isFinite(line) ? line : 0);
  }, 0);

  const orderTotal = Number.isFinite(Number(orderDetails?.order_total))
    ? Number(orderDetails.order_total)
    : computedTotal;

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <div className="alert alert-success">
        <h3 className="mb-1">Order Confirmed 🎉</h3>
        <div className="small">
          Order <strong>#{numericOrderId}</strong>
          {orderMeta?.date ? (
            <>
              {" "}
              • Placed on <strong>{formatDate(orderMeta.date)}</strong>
            </>
          ) : null}
          {petLabel ? (
            <>
              {" "}
              • For <strong>{petLabel}</strong>
            </>
          ) : null}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="mb-3">Order Summary</h5>

          {items.length === 0 ? (
            <div className="alert alert-info mb-0">
              No items found for this order.
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {items.map((item) => {
                const qty = Number(item?.quantity ?? 0);
                const unit = pickUnitPrice(item);
                const line = Number(item?.line_total ?? unit * qty);

                const key = `${numericOrderId}-${
                  item.product_id ?? item.id ?? item.name
                }`;

                return (
                  <li
                    key={key}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="me-3">
                      <div className="fw-semibold">{item.name}</div>
                      <div className="text-muted small">
                        ${formatMoney(unit)} × {qty}
                      </div>
                    </div>

                    <div className="fw-semibold">${formatMoney(line)}</div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="d-flex justify-content-end mt-3">
            <div className="fw-semibold fs-5">
              Total: ${formatMoney(orderTotal)}
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <Link to="/products" className="btn btn-primary">
              Keep Shopping
            </Link>

            <Link to="/cart" className="btn btn-outline-secondary">
              Back to Cart
            </Link>

            <Link to="/orders" className="btn btn-outline-dark">
              View Orders
            </Link>
          </div>
        </div>
      </div>

      <div className="text-muted small mt-3">
        Tip: You can view your completed orders anytime from{" "}
        <strong>View Orders</strong>.
      </div>
    </div>
  );
}
