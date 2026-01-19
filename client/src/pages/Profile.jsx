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

  const activeName = pets?.find((p) => p.id === activePetId)?.name || "—";

  return (
    <div className="d-flex flex-column min-vh-100 profile-page">
      {/* PAGE CONTENT */}
      <div className="flex-grow-1">
        <div
          className="container mt-5 profile-container"
          style={{ maxWidth: "800px" }}
        >
          {/* HEADER */}
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
            <div>
              <h2 className="mb-1 profile-title">My Profile</h2>
              <div className="text-muted small">
                Manage your account, orders, and pets.
              </div>
            </div>

            <span className="badge profile-badge">
              Signed in as <strong className="ms-1">{user.username}</strong>
            </span>
          </div>

          {/* USER INFO */}
          <div className="card mb-4 profile-card profile-card--info">
            <div className="card-body">
              <div className="d-flex align-items-start gap-3">
                <div className="profile-icon profile-icon--blue">
                  <i className="bi bi-person-circle" />
                </div>

                <div className="flex-grow-1">
                  <h5 className="card-title mb-2">Account Information</h5>

                  <div className="profile-kv">
                    <div className="profile-k">Username</div>
                    <div className="profile-v">{user.username}</div>
                  </div>

                  {user.email && (
                    <div className="profile-kv">
                      <div className="profile-k">Email</div>
                      <div className="profile-v">{user.email}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ORDERS */}
          <div className="card mb-4 profile-card profile-card--orders">
            <div className="card-body d-flex justify-content-between align-items-center gap-3 flex-wrap">
              <div className="d-flex align-items-start gap-3">
                <div className="profile-icon profile-icon--purple">
                  <i className="bi bi-bag-check" />
                </div>

                <div>
                  <h5 className="card-title mb-1">Orders</h5>
                  <p className="text-muted mb-0">
                    View your past orders and order details
                  </p>
                </div>
              </div>

              <Link to="/orders" className="btn btn-outline-primary">
                View Orders
              </Link>
            </div>
          </div>

          {/* PETS */}
          <div className="card profile-card profile-card--pets">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="profile-icon profile-icon--green">
                    <i className="bi bi-heart-pulse" />
                  </div>
                  <h5 className="card-title mb-0">My Pets</h5>
                </div>

                {pets?.length ? (
                  <span className="text-muted small">
                    Active: <strong>{activeName}</strong>
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
              <div className="profile-section mt-3">
                <div className="profile-section-title">
                  Add a pet
                  <span className="profile-section-subtitle">
                    (so you can shop per pet)
                  </span>
                </div>

                <form className="mt-2" onSubmit={handleAddPet}>
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
              </div>

              {/* PET LIST */}
              <hr className="my-4" />

              {!pets?.length ? (
                <p className="text-muted mb-0">
                  You don’t have any pets yet. Add one above to start shopping
                  for them.
                </p>
              ) : (
                <div className="list-group profile-pet-list">
                  {pets.map((p) => {
                    const isActive = p.id === activePetId;

                    return (
                      <button
                        key={p.id}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center profile-pet-row ${
                          isActive ? "active" : ""
                        }`}
                        onClick={async () => {
                          setActivePet(p.id);
                          await refreshCart();
                        }}
                      >
                        <div>
                          <div className="fw-semibold">
                            {p.name}{" "}
                            <span className="text-white-50">
                              ({p.pet_type})
                            </span>
                          </div>
                          {p.breed ? (
                            <div className="small">Breed: {p.breed}</div>
                          ) : null}
                        </div>

                        {isActive ? (
                          <span className="badge profile-pill-active">
                            Active
                          </span>
                        ) : (
                          <span className="badge profile-pill-inactive">
                            Set Active
                          </span>
                        )}
                      </button>
                    );
                  })}
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
