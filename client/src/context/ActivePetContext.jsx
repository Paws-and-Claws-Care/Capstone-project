import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ActivePetContext = createContext(null);

export function ActivePetProvider({ pets = [], children }) {
  const [activePetId, setActivePetId] = useState(() => {
    const saved = localStorage.getItem("activePetId");
    return saved ? Number(saved) : null;
  });

  // If pets load and there's no activePetId (or it's invalid), pick the first pet
  useEffect(() => {
    if (!pets.length) return;

    const exists = activePetId && pets.some((p) => p.id === activePetId);
    if (exists) return;

    const first = pets[0].id;
    setActivePetId(first);
    localStorage.setItem("activePetId", String(first));
  }, [pets, activePetId]);

  const activePet = useMemo(
    () => pets.find((p) => p.id === activePetId) || null,
    [pets, activePetId]
  );

  function setActivePet(id) {
    const petId = id ? Number(id) : null;
    setActivePetId(petId);

    if (petId) localStorage.setItem("activePetId", String(petId));
    else localStorage.removeItem("activePetId");
  }

  const value = useMemo(
    () => ({ activePetId, activePet, setActivePet }),
    [activePetId, activePet]
  );

  return (
    <ActivePetContext.Provider value={value}>
      {children}
    </ActivePetContext.Provider>
  );
}

export function useActivePet() {
  const ctx = useContext(ActivePetContext);
  if (!ctx)
    throw new Error("useActivePet must be used inside ActivePetProvider");
  return ctx;
}
