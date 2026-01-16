import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { getUser } from "../api/auth";
import { useActivePet } from "../context/ActivePetContext";
import { useCart } from "../context/CartContext";

export default function Profile() {
  const user = getUser();
  const { refreshCart } = useCart();

  const { pets, addPet, activePetId, setActivePet } = useActivePet();

  const [name, setName] = useState("");
  const [petType, setPetType] = useState("dog");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [saving, setSaving] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  async function handleAddPet(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    if (!name.trim()) {
      setStatus({ type: "error", msg: "Pet name is required." });
      return;
    }

    try {
      setSaving(true);
      await addPet({
        name: name.trim(),
        pet_type: petType,
        breed: breed.trim(),
      });
      setName("");
      setBreed("");
      setStatus({ type: "success", msg: "Pet added! ✅" });
    } catch (err) {
      setStatus({
        type: "error",
        msg: err?.message || "Failed to add pet.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* PAGE CONTENT */}
      <div className="flex-grow-1">
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

          {/* PETS */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">My Pets</h5>
                {pets?.length ? (
                  <span className="text-muted small">
                    Active:{" "}
                    <strong>
                      {pets.find((p) => p.id === activePetId)?.name || "—"}
                    </strong>
                  </span>
                ) : null}
              </div>

              {/* STATUS MESSAGE */}
              {status.msg && (
                <div
                  className={`alert mt-3 mb-0 ${
                    status.type === "success" ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                >
                  {status.msg}
                </div>
              )}

              {/* ADD PET FORM */}
              <form className="mt-3" onSubmit={handleAddPet}>
                <div className="row g-3">
                  <div className="col-12 col-md-5">
                    <label className="form-label">Pet Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Luna"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={saving}
                    />
                  </div>

                  <div className="col-12 col-md-3">
                    <label className="form-label">Pet Type *</label>
                    <select
                      className="form-select"
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      disabled={saving}
                    >
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label">Breed (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Golden Retriever"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      disabled={saving}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Add Pet"}
                    </button>
                  </div>
                </div>
              </form>

              {/* PET LIST */}
              <hr className="my-4" />

              {!pets?.length ? (
                <p className="text-muted mb-0">
                  You don’t have any pets yet. Add one above to start shopping
                  for them.
                </p>
              ) : (
                <div className="list-group">
                  {pets.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                        p.id === activePetId ? "active" : ""
                      }`}
                      onClick={async () => {
                        setActivePet(p.id);
                        await refreshCart();
                      }}
                    >
                      <div>
                        <div className="fw-semibold">
                          {p.name}{" "}
                          <span className="text-white-50">({p.pet_type})</span>
                        </div>
                        {p.breed ? (
                          <div className="small">Breed: {p.breed}</div>
                        ) : null}
                      </div>

                      {p.id === activePetId ? (
                        <span className="badge bg-light text-dark">Active</span>
                      ) : (
                        <span className="badge bg-secondary">Set Active</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER (FULL WIDTH) */}
      <footer className="w-100 bg-light border-top mt-5">
        <div className="container-fluid px-4 py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
            <div>© {new Date().getFullYear()} Paws & Claws Care</div>

            <div className="d-flex gap-3">
              <Link className="text-secondary text-decoration-none" to="/">
                Home
              </Link>

              <Link className="text-secondary text-decoration-none" to="/forum">
                Forum
              </Link>
              <Link className="text-secondary text-decoration-none" to="/about">
                About
              </Link>
              <Link
                className="text-secondary text-decoration-none"
                to="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
