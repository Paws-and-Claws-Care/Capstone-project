import { Link, useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "80vh" }}
    >
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4 p-md-5 text-center">
            {/* Icon */}
            <div className="mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger-subtle text-danger"
                style={{ width: 72, height: 72, fontSize: 34 }}
                aria-hidden="true"
              >
                !
              </span>
            </div>

            {/* Title */}
            <h1 className="display-5 fw-bold mb-2">404</h1>
            <h2 className="h4 mb-3">Page Not Found</h2>

            {/* Message */}
            <p className="text-muted mb-4">
              We couldn’t find the page you tried to visit. It may have been
              moved, deleted, or the link may be incorrect.
            </p>

            {/* Optional debug (helpful for dev + presentations) */}
            <div className="alert alert-secondary text-start small mb-4">
              <div className="fw-semibold mb-1">Requested path:</div>
              <code className="text-break">{location.pathname}</code>
            </div>

            {/* Actions */}
            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
              <Link to="/" className="btn btn-primary px-4">
                Go Home
              </Link>

              <Link to="/products" className="btn btn-outline-secondary px-4">
                Browse Products
              </Link>

              <button
                type="button"
                className="btn btn-outline-dark px-4"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>

            {/* Extra help links */}
            <div className="mt-4 pt-3 border-top text-muted small">
              If you believe this is an error, try refreshing the page or going
              back to a known section of the site.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
