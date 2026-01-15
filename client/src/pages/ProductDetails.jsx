import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";
import { useCart } from "../context/CartContext";
import { useActivePet } from "../context/ActivePetContext";

export default function ProductDetails() {
  const { id } = useParams();

  const { addItem, getQty, setQty, loading: cartLoading } = useCart();
  const { activePet } = useActivePet();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState("");

  const qty = product ? getQty(product.id) : 0;
  const inCart = qty > 0;

  const noPet = !activePet?.id;
  const blocked = cartLoading || noPet || Boolean(busy);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      setMsg("");
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function run(action, fn) {
    if (blocked) return;
    try {
      setBusy(action);
      await fn();
    } catch (err) {
      setMsg(err?.message || "Cart action failed");
    } finally {
      setBusy("");
    }
  }

  function handleAdd() {
    if (!product) return;

    if (noPet) {
      setMsg("Select an active pet to add items to the cart.");
      return;
    }

    run("add", async () => {
      await addItem(product, 1);
      setMsg("Added to cart!");
      setTimeout(() => setMsg(""), 1200);
    });
  }

  function decQty() {
    if (!product) return;
    run("dec", () => setQty(product.id, qty - 1));
  }

  function incQty() {
    if (!product) return;
    run("inc", () => setQty(product.id, qty + 1));
  }

  if (loading) {
    return (
      <div className="container py-4">
        <p className="text-muted">Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error || "Product not found"}</div>
        <Link to="/products" className="btn btn-outline-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 1000 }}>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Link to="/products" className="btn btn-outline-secondary btn-sm">
          ← Back to Products
        </Link>

        <Link to="/cart" className="btn btn-outline-primary btn-sm">
          Go to Cart
        </Link>
      </div>

      {noPet && (
        <div className="alert alert-warning">
          Select an active pet in the navbar to add items to a cart.
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="card">
            <img
              src={product.image_url}
              alt={product.name}
              className="card-img-top"
              style={{ maxHeight: 520, objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h2 className="mb-2">{product.name}</h2>

          <div className="d-flex gap-2 flex-wrap mb-3">
            {product.category && (
              <span className="badge text-bg-primary">{product.category}</span>
            )}
            {product.pet_type && (
              <span className="badge text-bg-secondary">
                {product.pet_type}
              </span>
            )}
          </div>

          <p className="fs-4 fw-bold mb-3">
            ${Number(product.price).toFixed(2)}
          </p>

          {msg && (
            <div
              className={`alert ${
                msg.toLowerCase().includes("added")
                  ? "alert-success"
                  : "alert-warning"
              }`}
            >
              {msg}
            </div>
          )}

          {!inCart ? (
            <button
              className="btn btn-light w-100 mb-3"
              onClick={handleAdd}
              disabled={blocked}
              type="button"
            >
              {busy === "add" ? "Adding..." : "Add to Cart"}
            </button>
          ) : (
            <div className="d-flex align-items-center gap-2 mb-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={blocked}
                onClick={decQty}
                style={{ width: 56 }}
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
                disabled={blocked}
                onClick={incQty}
                style={{ width: 56 }}
                title="Increase quantity"
              >
                {busy === "inc" ? "…" : "+"}
              </button>
            </div>
          )}

          {product.description && (
            <p className="text-muted" style={{ lineHeight: 1.6 }}>
              {product.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
