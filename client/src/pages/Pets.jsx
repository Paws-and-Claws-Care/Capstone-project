import { useState } from "react";
import { useActivePet } from "../context/ActivePetContext";
import { useCart } from "../context/CartContext";
import { deletePet } from "../api/pets";
import { getToken } from "../api/auth";

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

    // NOTE: Only keep the "orders/cart history" line if your backend truly cascades deletes.
    const ok = window.confirm(
      `Delete ${pet?.name || "this pet"}?\nThis cannot be undone.`
    );
    if (!ok) return;

    try {
      setBusyId(petId);
      setMsg("");

      await deletePet(token, petId);

      // refresh pets from server
      const updated = await refreshPets();

      // if we deleted the active pet, pick a new one (or clear)
      if (Number(activePetId) === Number(petId)) {
        const next = updated?.[0]?.id ?? null;
        setActivePet(next);
      }

      // ✅ keep backend cart cache + navbar badge in sync
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
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <h2 className="mb-3">My Pets</h2>

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
          No pets yet. Add one first, then you can shop per pet.
        </div>
      ) : (
        <div className="list-group">
          {pets.map((p) => (
            <div
              key={p.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-semibold">
                  {p.name}{" "}
                  {Number(activePetId) === Number(p.id) && (
                    <span className="badge bg-primary ms-2">Active</span>
                  )}
                </div>
                <div className="text-muted small">
                  {p.pet_type} {p.breed ? `• ${p.breed}` : ""}
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  type="button"
                  onClick={() => setActivePet(p.id)}
                  disabled={Number(activePetId) === Number(p.id)}
                >
                  Set Active
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  disabled={busyId === p.id}
                >
                  {busyId === p.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
