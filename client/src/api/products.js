const API = "/api";

async function parseResponse(res, defaultMsg) {
  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `${defaultMsg}. Status ${res.status}. Response: ${text.slice(0, 200)}`
    );
  }

  if (!res.ok) {
    throw new Error(data?.error || defaultMsg);
  }

  return data;
}

export async function fetchAllProducts() {
  const res = await fetch(`${API}/products`);
  return parseResponse(res, "Failed to fetch products");
}

export async function fetchProductsByPetType(petType) {
  const res = await fetch(
    `${API}/products?pet_type=${encodeURIComponent(petType)}`
  );
  return parseResponse(res, "Failed to fetch products by pet type");
}

export async function fetchProductsByCategory(category) {
  const res = await fetch(
    `${API}/products?category=${encodeURIComponent(category)}`
  );
  return parseResponse(res, "Failed to fetch products by category");
}

export async function fetchProductById(id) {
  const res = await fetch(`${API}/products/${id}`);
  return parseResponse(res, "Failed to fetch product");
}
