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
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default Products;
