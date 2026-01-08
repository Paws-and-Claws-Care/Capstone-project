import { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/products";

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

      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "24px" }}>
          <h3>{product.name}</h3>
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
