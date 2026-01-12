import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {

    //guard to return null if no product is passed in
  if (!product) return null;

  return (
    <div className="card h-100 shadow-sm">
        {/* individual product link */}
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none text-dark"
        style={{ display: "block" }}
      >
        {/* product image */}
        <img
          src={product.image_url}
          alt={product.name}
          className="card-img-top"
          style={{ height: "260px", objectFit: "contain" }}
        />

        <div className="card-body">
          <h5 className="card-title mb-2">{product.name}</h5>

          {/* product price is displayed as a number with only two decimal places */}
          <p className="fw-bold mb-0">${Number(product.price).toFixed(2)}</p>
        </div>
      </Link>

      <div className="card-footer bg-white border-0 pt-0">
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            //prevents the link from being followed when clicking add to cart
            e.stopPropagation();
            //calls onAdd function (if passed as prop) with the product as argument
            onAdd?.(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
