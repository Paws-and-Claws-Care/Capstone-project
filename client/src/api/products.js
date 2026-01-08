export async function fetchAllProducts() {
  const res = await fetch("/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
export async function fetchProductsByCategory(category) {
  const res = await fetch(`/api/products?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch by category");
  return res.json();
}

export async function fetchProductsByPetType(petType) {
  const res = await fetch(
    `/api/products?pet_type=${encodeURIComponent(petType)}`
  );
  if (!res.ok) throw new Error("Failed to fetch products by pet type");
  return res.json();
}
