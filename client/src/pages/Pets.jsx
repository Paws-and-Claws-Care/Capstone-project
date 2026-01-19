// client/src/pages/Pets.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useActivePet } from "../context/ActivePetContext";
import { useCart } from "../context/CartContext";
import { deletePet } from "../api/pets";
import { getToken } from "../api/auth";

function getPetEmoji(petType) {
  const t = (petType || "").toLowerCase();
  if (t.includes("cat")) return "🐱";
  return "🐶"; // default to dog
}

export default function Pets() {
  const { pets, activePetId, setActivePet, refreshPets } = useActivePet();
  const { refreshCart } = useCart();

  const [msg, setMsg] = useState("");
  const [busyId, setBusyId] = useState(null);

  async function handleDelete(petId) {
    const token = getToken?.() || localStorage.getItem("token");
    if (!token) {
      setMsg("Please login again.");
      return;
    }

    const pet = pets.find((p) => Number(p.id) === Number(petId));
    const ok = window.confirm(
      `Delete ${pet?.name || "this pet"}?\nThis cannot be undone.`
    );
    if (!ok) return;

    try {
      setBusyId(petId);
      setMsg("");

      await deletePet(token, petId);

      const updated = await refreshPets();

      if (Number(activePetId) === Number(petId)) {
        const next = updated?.[0]?.id ?? null;
        setActivePet(next);
      }

      await refreshCart();

      setMsg("Pet deleted.");
      setTimeout(() => setMsg(""), 1500);
    } catch (err) {
      setMsg(err?.message || "Failed to delete pet");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100 pets-page">
      <div className="flex-grow-1">
        <div className="container py-4" style={{ maxWidth: 1000 }}>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div className="container py-4" style={{ maxWidth: 900 }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">My Pets</h2>
                <Link to="/profile" className="btn btn-outline-secondary">
                  My Profile
                </Link>
              </div>

              {/* rest of the page */}
            </div>
          </div>

          {msg && (
            <div
              className={`alert ${
                msg.toLowerCase().includes("deleted")
                  ? "alert-success"
                  : "alert-warning"
              }`}
            >
              {msg}
            </div>
          )}

          {pets.length === 0 ? (
            <div className="alert alert-info">
              No pets yet. Add one first in your Profile.
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-lg-2 g-4">
              {pets.map((p) => {
                const isActive = Number(activePetId) === Number(p.id);
                const emoji = getPetEmoji(p.pet_type);

                return (
                  <div className="col" key={p.id}>
                    <div
                      className={`pet-card h-100 ${
                        (p.pet_type || "").toLowerCase().includes("cat")
                          ? "pet-card--cat"
                          : "pet-card--dog"
                      }`}
                    >
                      {/* top "image" area like product card */}
                      <div className="pet-card-top">
                        <div
                          className={`pet-avatar ${
                            (p.pet_type || "").toLowerCase().includes("cat")
                              ? "pet-avatar-cat"
                              : "pet-avatar-dog"
                          }`}
                          aria-hidden="true"
                        >
                          <span className="pet-emoji">{emoji}</span>
                        </div>
                      </div>

                      <div className="pet-card-body">
                        <div className="d-flex align-items-center justify-content-between gap-2">
                          <div className="pet-name">
                            {p.name}{" "}
                            {isActive && (
                              <span className="badge bg-primary ms-2">
                                Active
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pet-meta">
                          {(p.pet_type || "").toLowerCase()}{" "}
                          {p.breed ? `• ${p.breed}` : ""}
                        </div>

                        <div className="pet-actions mt-3">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => setActivePet(p.id)}
                            disabled={isActive}
                          >
                            Set Active
                          </button>

                          <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={() => handleDelete(p.id)}
                            disabled={busyId === p.id}
                          >
                            {busyId === p.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
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
