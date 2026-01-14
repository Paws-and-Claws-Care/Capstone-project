import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { fetchAllProducts, fetchProductsByPetType } from "../api/products";
import ProductCard from "../components/ProductCard";
import { useActivePet } from "../context/ActivePetContext";
import { getUser, getToken } from "../api/auth";
import { useCart } from "../context/CartContext";

const normalize = (s) => (s ?? "").toString().trim().toLowerCase();

const HEALTH_CATEGORY_SET = new Set(
  [
    "skin and coat supplements",
    "skin and coat supplement",
    "hip and joint supplement",
    "digestive supplement",
    "flea and tick",
    "flea & tick",
    "anxiety & calming",
    "anixety & calming",
  ].map(normalize)
);

const ALLOWED_FILTERS = new Set([
  "all",
  "food",
  "treats",
  "supplies",
  "health",
]);

export default function Products() {
  const navigate = useNavigate();
  const user = getUser();
  const token = getToken?.() || localStorage.getItem("token");

  const { activePet } = useActivePet();
  const { addItem, isInCart } = useCart();

  const { petType: petTypeParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const petTypeQuery = normalize(searchParams.get("petType"));
  const filterFromUrl = normalize(searchParams.get("filter"));

  // ✅ NEW: search from URL (?search=...)
  const searchFromUrl = normalize(searchParams.get("search"));

  const petType = petTypeQuery || normalize(petTypeParam) || "";

  const [baseProducts, setBaseProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const [msg, setMsg] = useState("");
  const [addingId, setAddingId] = useState(null);

  // keep UI filter synced with URL
  useEffect(() => {
    const next = ALLOWED_FILTERS.has(filterFromUrl) ? filterFromUrl : "all";
    setActiveFilter(next);
    setItemOffset(0);
  }, [filterFromUrl]);

  // ✅ NEW: when search changes, reset pagination too
  useEffect(() => {
    setItemOffset(0);
  }, [searchFromUrl]);

  // fetch products when petType changes
  useEffect(() => {
    async function load() {
      try {
        const data = petType
          ? await fetchProductsByPetType(petType)
          : await fetchAllProducts();

        setBaseProducts(Array.isArray(data) ? data : []);
        setItemOffset(0);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [petType]);

  // in-memory filtering (category + health + ✅ search)
  const filteredProducts = useMemo(() => {
    let list = baseProducts;

    // ✅ 1) category filter
    if (activeFilter !== "all") {
      if (activeFilter === "health") {
        list = list.filter((p) =>
          HEALTH_CATEGORY_SET.has(normalize(p.category))
        );
      } else {
        list = list.filter(
          (p) => normalize(p.category) === normalize(activeFilter)
        );
      }
    }

    // ✅ 2) search filter
    if (searchFromUrl) {
      list = list.filter((p) => {
        const name = normalize(p.name);
        const desc = normalize(p.description);
        const cat = normalize(p.category);

        return (
          name.includes(searchFromUrl) ||
          desc.includes(searchFromUrl) ||
          cat.includes(searchFromUrl)
        );
      });
    }

    return list;
  }, [baseProducts, activeFilter, searchFromUrl]);

  // pagination
  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  function handlePageClick(event) {
    setItemOffset(event.selected * itemsPerPage);
  }

  function setFilter(filterName) {
    const next = new URLSearchParams(searchParams);

    if (!filterName || filterName === "all") next.delete("filter");
    else next.set("filter", filterName);

    if (petType) next.set("petType", petType);
    else next.delete("petType");

    // ✅ keep search in URL when switching filters
    if (searchFromUrl) next.set("search", searchFromUrl);
    else next.delete("search");

    setSearchParams(next);
    setItemOffset(0);
  }

  async function handleAdd(product) {
    setMsg("");

    if (!activePet?.id) {
      setMsg("Select an active pet in the navbar to add items to a cart.");
      return;
    }

    if (!token || !user) {
      setMsg("Login to add items to your cart");
      setTimeout(() => navigate("/login"), 800);
      return;
    }

    try {
      setAddingId(product.id);
      await addItem(product, 1);
      setMsg("Added to cart!");
      setTimeout(() => setMsg(""), 1200);
    } catch (err) {
      const text = err?.message || "Failed to add item to cart";
      setMsg(text);

      if (
        text.toLowerCase().includes("login") ||
        text.toLowerCase().includes("unauthorized")
      ) {
        setTimeout(() => navigate("/login"), 800);
      }
    } finally {
      setAddingId(null);
    }
  }

  const title = petType
    ? `${petType[0].toUpperCase()}${petType.slice(1)} Products`
    : "All Products";

  return (
    <div className="container py-4">
      <h2 className="mb-2">{title}</h2>

      {/* ✅ Optional: show search term to user */}
      {searchFromUrl && (
        <div className="text-muted mb-2">
          Showing results for: <strong>{searchFromUrl}</strong>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div className="text-muted">
          Adding to cart for:{" "}
          <strong>
            {activePet ? activePet.name : "No active pet selected"}
          </strong>
        </div>

        {!user && (
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className={`btn ${
            activeFilter === "food" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("food")}
          type="button"
        >
          Food
        </button>

        <button
          className={`btn ${
            activeFilter === "treats" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("treats")}
          type="button"
        >
          Treats
        </button>

        <button
          className={`btn ${
            activeFilter === "supplies" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("supplies")}
          type="button"
        >
          Supplies
        </button>

        <button
          className={`btn ${
            activeFilter === "health" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("health")}
          type="button"
        >
          Health & Wellness
        </button>

        <button
          className="btn btn-dark"
          onClick={() => setFilter("all")}
          type="button"
        >
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

      {!activePet && (
        <div className="alert alert-warning">
          Select an active pet in the navbar to add items to a cart.
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {currentProducts.map((p) => (
          <div className="col" key={p.id}>
            <ProductCard
              product={p}
              onAdd={handleAdd}
              disabled={!activePet?.id || addingId === p.id}
              isAdded={isInCart(p.id)}
              busy={addingId === p.id}
            />
          </div>
        ))}
      </div>

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
