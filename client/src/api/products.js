const API = "/api";

// Small helper so all functions handle errors the same way
async function parseResponse(res, defaultMsg) {
  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // If backend returned HTML or plain text, a message is still shown
    throw new Error(
      `${defaultMsg}. Status ${res.status}. Response: ${text.slice(0, 200)}`
    );
  }

  if (!res.ok) {
    throw new Error(data?.error || defaultMsg);
  }

  return data;
}

//Used by Products.jsx when there is no petType param
export async function fetchAllProducts() {
  const res = await fetch(`${API}/products`);
  return parseResponse(res, "Failed to fetch products");
}

//Used by Products.jsx for /products/dog and /products/cat
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
  const res = await fetch(`/api/products/${id}`);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Failed to fetch product");
  }

  return text ? JSON.parse(text) : null;
}
