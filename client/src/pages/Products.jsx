import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductsByPetType,
} from "../api/products";

function Products() {
  const [products, setProducts] = useState([]);

  // Pagination state
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  // Compute pagination slices
  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // When user clicks a pagination button
  function handlePageClick(event) {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  }

  // Helper: load products + reset pagination to page 1
  async function setProductsAndReset(fetchFn) {
    try {
      const data = await fetchFn();
      setProducts(data);
      setItemOffset(0); // reset to first page whenever the list changes
    } catch (err) {
      console.error(err);
    }
  }

  // Initial load
  useEffect(() => {
    setProductsAndReset(() => fetchAllProducts());
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Products</h2>

      {/* FILTER BUTTONS */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {/* Category filters */}
        <button
          className="btn btn-outline-primary"
          onClick={() =>
            setProductsAndReset(() => fetchProductsByCategory("treats"))
          }
        >
          Treats
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() =>
            setProductsAndReset(() => fetchProductsByCategory("food"))
          }
        >
          Food
        </button>

        {/* Pet type filters */}
        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            setProductsAndReset(() => fetchProductsByPetType("dog"))
          }
        >
          Dog
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            setProductsAndReset(() => fetchProductsByPetType("cat"))
          }
        >
          Cat
        </button>

        {/* Reset */}
        <button
          className="btn btn-dark"
          onClick={() => setProductsAndReset(() => fetchAllProducts())}
        >
          All Products
        </button>
      </div>

      {/* PRODUCTS GRID */}
      <div className="row g-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="card h-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>

                <div className="d-flex gap-2 flex-wrap mb-2">
                  <span className="badge text-bg-primary">
                    {product.category}
                  </span>
                  <span className="badge text-bg-secondary">
                    {product.pet_type}
                  </span>
                </div>

                <p className="card-text" style={{ flexGrow: 1 }}>
                  {product.description}
                </p>

                <p className="fw-bold mb-0">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {pageCount > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            previousLabel="< Prev"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        </nav>
      )}
    </div>
  );
}

export default Products;
