import { Link, Navigate } from "react-router-dom";
import { getUser } from "../api/auth";

export default function Profile() {
  //gets current user object
  const user = getUser();

  //redirect back to login if not logged in - user cannot hit back button
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4">My Profile</h2>

      {/* USER INFO */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Account Information</h5>
          <p className="mb-1">
            <strong>Username:</strong> {user.username}
          </p>
          {user.email && (
            <p className="mb-0">
              <strong>Email:</strong> {user.email}
            </p>
          )}
        </div>
      </div>

      {/* ORDERS */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title mb-1">Orders</h5>
            <p className="text-muted mb-0">
              View your past orders and order details
            </p>
          </div>

          <Link to="/orders" className="btn btn-outline-primary">
            View Orders
          </Link>
        </div>
      </div>

      {/* PET INFO (TEMP / MVP PLACEHOLDER) */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">My Pet</h5>

          {/* TEMP FORM — not wired yet */}
          <form>
            <div className="mb-3">
              <label className="form-label">Pet Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Luna"
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Breed</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Golden Retriever"
                disabled
              />
            </div>

            <button type="button" className="btn btn-secondary" disabled>
              Save Pet Info (Coming Soon)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
