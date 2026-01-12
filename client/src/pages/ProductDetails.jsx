// client/src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/products";
import { addToCart } from "../api/cart";

export default function ProductDetails() {
  //get ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  //store fetched product object
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //stores "added to cart" or "Login to account" message
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      setMsg("");

      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
    //dependency on id so it refetches if id changes
  }, [id]);

  //add to cart handler function
  function handleAdd() {
    try {
      //add quantity of 1 product to cart on click
      addToCart(product, 1);
      setMsg("Added to cart!");
      //clears message after a minute and a half
      setTimeout(() => setMsg(""), 1500);
    } catch (err) {
      const text = err?.message || "Login to add items to your cart";
      setMsg(text);
      // // send to login - might change because its pretty quick
      // if (text.toLowerCase().includes("login")) {
      //   setTimeout(() => navigate("/login"), 800);
      // }
    }
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

          <button className="btn btn-primary w-100 mb-3" onClick={handleAdd}>
            Add to Cart
          </button>

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
