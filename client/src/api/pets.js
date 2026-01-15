const API_URL = "/api";

function headers(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}

export async function deletePet(token, petId) {
  const res = await fetch(`${API_URL}/pets/${petId}`, {
    method: "DELETE",
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to delete pet"
    );
  return data;
}

export async function getMyPets(token) {
  const res = await fetch(`${API_URL}/pets`, {
    headers: headers(token),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to load pets"
    );
  return data;
}

export async function createPet(token, { name, pet_type, breed }) {
  const res = await fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ name, pet_type, breed }),
  });

  const data = await parse(res);
  if (!res.ok)
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to create pet"
    );
  return data;
}
