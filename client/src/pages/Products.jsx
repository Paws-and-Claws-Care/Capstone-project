import { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductsByPetType,
} from "../api/products";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllProducts();
        console.log("PRODUCTS:", data);
        setProducts(data);
        console.log("first product:", data[100]);
      } catch (err) {
        console.error(err);
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>

      <h2>Products</h2>

      {/* CATEGORY FILTERS */}
      <button
        onClick={async () => {
          const data = await fetchProductsByCategory("treats");
          console.log("TREATS:", data);
          setProducts(data);
        }}
      >
        Treats
      </button>

      <button
        onClick={async () => {
          const data = await fetchProductsByCategory("food");
          setProducts(data);
        }}
      >
        Food
      </button>

      {/* PET TYPE FILTERS */}
      <button
        onClick={async () => {
          const data = await fetchProductsByPetType("dog");
          console.log("DOG PRODUCTS:", data);
          setProducts(data);
        }}
      >
        Dog
      </button>

      <button
        onClick={async () => {
          const data = await fetchProductsByPetType("cat");
          setProducts(data);
        }}
      >
        Cat
      </button>

      {/* RESET */}
      <button
        onClick={async () => {
          const data = await fetchAllProducts();
          setProducts(data);
        }}
      >
        All Products
      </button>

      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "24px" }}>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <h3>{product.pet_type}</h3>
          <h4>{product.description}</h4>

          <img
            src={product.image_url}
            alt={product.name}
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />

          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;

//fetch all products

// category sort by treat
// const data = await fetchProductsByCategory("treats");
//         console.log("CATEGORY PRODUCTS:", data);
//         setProducts(data);
