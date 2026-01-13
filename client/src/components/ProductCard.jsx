import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  onAdd,
  isAdded,
  disabled = false,
}) {
  if (!product) return null;

  return (
    <div className="card h-100 shadow-sm">
      {/* IMAGE — clickable */}
      <Link to={`/products/${product.id}`} className="text-decoration-none">
        <img
          src={product.image_url}
          alt={product.name}
          className="card-img-top"
          style={{ height: "260px", objectFit: "contain" }}
        />
      </Link>

      <div className="card-body">
        {/* TITLE — clickable */}
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-dark"
        >
          <h5 className="card-title mb-2">{product.name}</h5>
        </Link>

        <p className="fw-bold mb-0">${Number(product.price).toFixed(2)}</p>
      </div>

      {/* BUTTON — NOT inside a Link */}
      <div className="card-footer bg-white border-0 pt-0">
        <button
          type="button"
          className={`btn w-100 ${isAdded ? "btn-primary" : "btn-light"}`}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled) return;
            onAdd?.(product);
          }}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
