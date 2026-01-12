import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  if (!product) return null;

  return (
    <div className="card h-100 shadow-sm">
      {/* Click card -> details page */}
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none text-dark"
        style={{ display: "block" }}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="card-img-top"
          style={{ height: "260px", objectFit: "contain" }}
        />

        <div className="card-body">
          <h5 className="card-title mb-2">{product.name}</h5>
          <p className="fw-bold mb-0">${Number(product.price).toFixed(2)}</p>
        </div>
      </Link>

      {/* Button should NOT navigate */}
      <div className="card-footer bg-white border-0 pt-0">
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd?.(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
