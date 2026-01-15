import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMyPets, createPet as apiCreatePet } from "../api/pets";
import { getToken, getUser, AUTH_CHANGED_EVENT } from "../api/auth";

const ActivePetContext = createContext(null);

export function ActivePetProvider({ children }) {
  const [pets, setPets] = useState([]);

  const [activePetId, setActivePetId] = useState(() => {
    const saved = localStorage.getItem("activePetId");
    return saved ? Number(saved) : null;
  });

  const [authTick, setAuthTick] = useState(0);

  useEffect(() => {
    const onAuthChanged = () => setAuthTick((t) => t + 1);
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
  }, []);

  const loggedInUser = useMemo(() => getUser(), [authTick]);

  async function refreshPets() {
    const token = getToken();

    if (!token) {
      setPets([]);
      return [];
    }

    const data = await getMyPets(token);
    setPets(data);
    return data;
  }

  async function addPet({ name, pet_type, breed }) {
    const token = getToken();
    if (!token) throw new Error("Not logged in");

    const newPet = await apiCreatePet(token, { name, pet_type, breed });

    await refreshPets();
    setActivePet(newPet.id);

    return newPet;
  }

  useEffect(() => {
    if (!loggedInUser) {
      setPets([]);
      setActivePetId(null);
      localStorage.removeItem("activePetId");
      return;
    }

    refreshPets().catch(() => setPets([]));
  }, [authTick, loggedInUser?.id]);

  useEffect(() => {
    if (!pets.length) {
      setActivePetId(null);
      localStorage.removeItem("activePetId");
      return;
    }

    const stillValid = activePetId && pets.some((p) => p.id === activePetId);
    if (stillValid) return;

    const firstId = pets[0].id;
    setActivePetId(firstId);
    localStorage.setItem("activePetId", String(firstId));
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
    () => ({
      pets,
      refreshPets,
      addPet,
      activePetId,
      activePet,
      setActivePet,
    }),
    [pets, activePetId, activePet]
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
