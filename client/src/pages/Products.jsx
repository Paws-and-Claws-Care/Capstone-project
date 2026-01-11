import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { fetchAllProducts, fetchProductsByPetType } from "../api/products";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../api/cart";

// Normalize: trims + lowercases so "Supplies" == "supplies", and removes extra spaces
const normalize = (s) => (s ?? "").toString().trim().toLowerCase();

// Your DB “Health & Wellness” is actually 5 different category strings.
// We include variants/typos from your seed so the button works reliably.
const HEALTH_CATEGORY_SET = new Set(
  [
    // Skin & Coat
    "skin and coat supplements",
    "skin and coat supplement",

    // Hip & Joint
    "hip and joint supplement",

    // Digestive
    "digestive supplement",

    // Flea & Tick (both formats exist)
    "flea and tick",
    "flea & tick",

    // Anxiety & Calming (typos exist in seed)
    "anxiety & calming",
    "anxiety & calming",
    "anixety & calming",
    "anixety & calming",
    "anixety & calming",
  ].map(normalize)
);

function Products() {
  const { petType } = useParams(); // "dog" | "cat" | undefined

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  function handleAdd(product) {
    try {
      addToCart(product, 1);
      setMsg("Added to cart!");
      setTimeout(() => setMsg(""), 1500);
    } catch (err) {
      const text = err?.message || "Login to add items to your cart";
      setMsg(text);
      if (text.toLowerCase().includes("login")) {
        setTimeout(() => navigate("/login"), 800);
      }
    }
  }

  // Base list from API (already filtered by petType if route has it)
  const [baseProducts, setBaseProducts] = useState([]);

  // Page filter: "all" | "food" | "treats" | "supplies" | "health"
  const [activeFilter, setActiveFilter] = useState("all");

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  // Fetch when petType changes
  useEffect(() => {
    async function load() {
      try {
        const data = petType
          ? await fetchProductsByPetType(petType)
          : await fetchAllProducts();

        setBaseProducts(data);
        setActiveFilter("all");
        setItemOffset(0);

        // If you ever want to see all category values:
        // console.log([...new Set(data.map((p) => p.category))]);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [petType]);

  // Apply the category filter
  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return baseProducts;

    if (activeFilter === "health") {
      return baseProducts.filter((p) =>
        HEALTH_CATEGORY_SET.has(normalize(p.category))
      );
    }

    // food / treats / supplies
    return baseProducts.filter(
      (p) => normalize(p.category) === normalize(activeFilter)
    );
  }, [baseProducts, activeFilter]);

  // Paginate the filtered list
  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  function handlePageClick(event) {
    setItemOffset(event.selected * itemsPerPage);
  }

  function setFilter(filterName) {
    setActiveFilter(filterName);
    setItemOffset(0);
  }

  const title = petType
    ? `${petType[0].toUpperCase()}${petType.slice(1)} Products`
    : "All Products";

  return (
    <div className="container py-4">
      <h2 className="mb-3">{title}</h2>

      {/* FILTER BUTTONS */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className={`btn ${
            activeFilter === "food" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("food")}
        >
          Food
        </button>

        <button
          className={`btn ${
            activeFilter === "treats" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("treats")}
        >
          Treats
        </button>

        <button
          className={`btn ${
            activeFilter === "supplies" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("supplies")}
        >
          Supplies
        </button>

        <button
          className={`btn ${
            activeFilter === "health" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("health")}
        >
          Health & Wellness
        </button>

        <button className="btn btn-dark" onClick={() => setFilter("all")}>
          All {petType ? petType : ""} Products
        </button>
      </div>

      {/* PRODUCTS GRID
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
      </div> */}
      {msg && (
        <div
          className={`alert ${
            msg.toLowerCase().includes("added")
              ? "alert-success"
              : "alert-warning"
          }`}
        >
          {msg}
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {currentProducts.map((p) => (
          <div className="col" key={p.id}>
            <ProductCard product={p} onAdd={handleAdd} />
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
