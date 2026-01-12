import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { fetchAllProducts, fetchProductsByPetType } from "../api/products";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../api/cart";

/**
 * CODE REVIEW NOTE:
 * normalize() prevents bugs caused by casing/spaces.
 * Example: " Treats " == "treats"
 */
const normalize = (s) => (s ?? "").toString().trim().toLowerCase();

/**
 * CODE REVIEW NOTE:
 * Our seed data uses multiple category strings for what we show as "Health & Wellness".
 * Until the DB is cleaned up, we group them here so the UI filter works reliably.
 */
const HEALTH_CATEGORY_SET = new Set(
  [
    // Skin & Coat
    "skin and coat supplements",
    "skin and coat supplement",

    // Hip & Joint
    "hip and joint supplement",

    // Digestive
    "digestive supplement",

    // Flea & Tick
    "flea and tick",
    "flea & tick",

    // Anxiety & Calming (typos exist in seed)
    "anxiety & calming",
    "anixety & calming",
  ].map(normalize)
);

/**
 * CODE REVIEW NOTE:
 * Filters the Products page supports.
 * We validate filterFromUrl against this so random URLs don't break the UI.
 */
const ALLOWED_FILTERS = new Set([
  "all",
  "food",
  "treats",
  "supplies",
  "health",
]);

function Products() {
  const navigate = useNavigate();

  /**
   * CODE REVIEW NOTE:
   * We support petType from TWO places:
   * 1) Query string (Home page): /products?petType=dog
   * 2) Route param (alternate route): /products/pet/dog
   */
  const { petType: petTypeParam } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  // Query-string values
  const petTypeQuery = normalize(searchParams.get("petType")); // "dog" | "cat" | ""
  const filterFromUrl = normalize(searchParams.get("filter")); // "treats" | "health" | ...

  // Use query petType first (because Home sends it), fallback to param petType
  const petType = petTypeQuery || normalize(petTypeParam) || "";

  const [msg, setMsg] = useState("");

  // Base list from API (already filtered by petType if provided)
  const [baseProducts, setBaseProducts] = useState([]);

  // UI filter state ("all" | "food" | "treats" | "supplies" | "health")
  const [activeFilter, setActiveFilter] = useState("all");

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  function handleAdd(product) {
    try {
      addToCart(product, 1);
      setMsg("Added to cart!");
      setTimeout(() => setMsg(""), 1500);
    } catch (err) {
      const text = err?.message || "Login to add items to your cart";
      setMsg(text);

      // CODE REVIEW NOTE: If not logged in, send user to login.
      if (text.toLowerCase().includes("login")) {
        setTimeout(() => navigate("/login"), 800);
      }
    }
  }

  /**
   * CODE REVIEW NOTE:
   * URL -> UI SYNC:
   * Whenever the URL filter changes (Home click, back button, manual URL edit),
   * we update activeFilter and reset pagination to page 1.
   */
  useEffect(() => {
    const next = ALLOWED_FILTERS.has(filterFromUrl) ? filterFromUrl : "all";
    setActiveFilter(next);
    setItemOffset(0);
  }, [filterFromUrl]);

  /**
   * CODE REVIEW NOTE:
   * We fetch products when petType changes.
   * - If petType exists -> call fetchProductsByPetType(petType)
   * - Else -> fetchAllProducts()
   */
  useEffect(() => {
    async function load() {
      try {
        const data = petType
          ? await fetchProductsByPetType(petType)
          : await fetchAllProducts();

        setBaseProducts(data);
        setItemOffset(0);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [petType]);

  /**
   * CODE REVIEW NOTE:
   * Filtering happens in memory (client-side) AFTER fetching.
   * This avoids extra API calls for basic UI filtering.
   */
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

  // Pagination calculations
  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  function handlePageClick(event) {
    setItemOffset(event.selected * itemsPerPage);
  }

  /**
   * CODE REVIEW NOTE:
   * Keep filters in the URL so:
   * - refresh keeps selection
   * - shareable links
   * - back/forward works correctly
   *
   * ALSO: Keep petType in the URL when switching filters.
   */
  function setFilter(filterName) {
    const next = new URLSearchParams(searchParams);

    if (!filterName || filterName === "all") next.delete("filter");
    else next.set("filter", filterName);

    // Keep petType consistent (especially when user started from /products?petType=dog)
    if (petType) next.set("petType", petType);
    else next.delete("petType");

    setSearchParams(next);
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
