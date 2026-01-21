import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useActivePet } from "../context/ActivePetContext";

export default function ProductCard({ product, disabled = false, onOpen }) {
  const { addItem, getQty, setQty, loading } = useCart();
  const { activePet } = useActivePet();

  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");

  if (!product) return null;

  const qty = getQty(product.id);
  const inCart = qty > 0;

  const noPet = !activePet?.id;
  const blocked = disabled || loading || noPet || Boolean(busy);

  async function run(action, fn, successMsg = "") {
    if (blocked) return;
    try {
      setBusy(action);
      await fn();

      if (successMsg) {
        setMsg(successMsg);
        setTimeout(() => setMsg(""), 1200);
      }
    } catch (err) {
      alert(err?.message || "Cart action failed");
    } finally {
      setBusy("");
    }
  }

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    run("add", () => addItem(product, 1), "Added to cart!");
  }

  function dec(e) {
    e.preventDefault();
    e.stopPropagation();
    run("dec", () => setQty(product.id, qty - 1)); // can hit 0
  }

  function inc(e) {
    e.preventDefault();
    e.stopPropagation();
    run("inc", () => setQty(product.id, qty + 1));
  }

  return (
    <div className="card h-100 shadow-sm">
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none"
        onClick={onOpen}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="card-img-top"
          style={{ height: "260px", objectFit: "contain" }}
        />
      </Link>

      <div className="card-body">
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-dark"
          onClick={onOpen}
        >
          <h5 className="card-title mb-2">{product.name}</h5>
        </Link>

        <p className="fw-bold mb-0">${Number(product.price).toFixed(2)}</p>

        {noPet && (
          <div className="text-muted small mt-2">
            Select an active pet to add items to the cart.
          </div>
        )}
      </div>

      <div className="card-footer bg-white border-0 pt-0">
        {msg && (
          <div className="alert alert-success py-1 mb-2 text-center small">
            {msg}
          </div>
        )}

        {!inCart ? (
          <button
            type="button"
            className="btn btn-light w-100"
            disabled={blocked}
            onClick={handleAdd}
          >
            {busy === "add" ? "Adding..." : "Add to Cart"}
          </button>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ width: 44 }}
              disabled={blocked}
              onClick={dec}
              title={qty === 1 ? "Remove from cart" : "Decrease quantity"}
            >
              {busy === "dec" ? "…" : "−"}
            </button>

            <button
              type="button"
              className="btn btn-primary flex-grow-1"
              disabled
              style={{ cursor: "default" }}
            >
              In Cart: {qty}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ width: 44 }}
              disabled={blocked}
              onClick={inc}
              title="Increase quantity"
            >
              {busy === "inc" ? "…" : "+"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
