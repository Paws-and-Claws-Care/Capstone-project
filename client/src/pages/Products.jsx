import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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

// ✅ scroll state keys
const SCROLL_KEY = "productsScrollY";
const OFFSET_KEY = "productsItemOffset";

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
  const searchFromUrl = normalize(searchParams.get("search"));

  const petType = petTypeQuery || normalize(petTypeParam) || "";

  const [baseProducts, setBaseProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const [msg, setMsg] = useState("");
  const [addingId, setAddingId] = useState(null);

  // ✅ track when initial fetch finished so we can restore scroll AFTER render
  const [loadedOnce, setLoadedOnce] = useState(false);

  // ✅ used to scroll only after we restored the correct page
  const [restorePending, setRestorePending] = useState(false);

  // ✅ apply filter from URL
  useEffect(() => {
    const next = ALLOWED_FILTERS.has(filterFromUrl) ? filterFromUrl : "all";
    setActiveFilter(next);
    setItemOffset(0);
  }, [filterFromUrl]);

  // ✅ reset offset if search changes
  useEffect(() => {
    setItemOffset(0);
  }, [searchFromUrl]);

  // ✅ load products
  useEffect(() => {
    async function load() {
      try {
        const data = petType
          ? await fetchProductsByPetType(petType)
          : await fetchAllProducts();

        setBaseProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadedOnce(true);
      }
    }
    load();
  }, [petType]);

  // ✅ restore page offset after products load (scroll happens in the next effect)
  useEffect(() => {
    if (!loadedOnce) return;

    const savedOffset = sessionStorage.getItem(OFFSET_KEY);
    const savedY = sessionStorage.getItem(SCROLL_KEY);

    if (!savedOffset && !savedY) return;

    if (savedOffset) {
      setItemOffset(Number(savedOffset) || 0);
      sessionStorage.removeItem(OFFSET_KEY);
      setRestorePending(true); // wait to scroll until after page render
      return;
    }

    // if we only have scroll (no offset), we can scroll immediately
    if (savedY) {
      setTimeout(() => {
        window.scrollTo(0, Number(savedY) || 0);
        sessionStorage.removeItem(SCROLL_KEY);
      }, 0);
    }
  }, [loadedOnce]);

  // ✅ after itemOffset renders the right page, restore scroll
  useEffect(() => {
    if (!restorePending) return;

    const savedY = sessionStorage.getItem(SCROLL_KEY);
    if (!savedY) {
      setRestorePending(false);
      return;
    }

    setTimeout(() => {
      window.scrollTo(0, Number(savedY) || 0);
      sessionStorage.removeItem(SCROLL_KEY);
      setRestorePending(false);
    }, 0);
  }, [restorePending, itemOffset]);

  const filteredProducts = useMemo(() => {
    let list = baseProducts;

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

  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  function handlePageClick(event) {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);

    // clear any saved "return position" so pagination always wins
    sessionStorage.removeItem(SCROLL_KEY);
    sessionStorage.removeItem(OFFSET_KEY);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setFilter(filterName) {
    const next = new URLSearchParams(searchParams);

    if (!filterName || filterName === "all") next.delete("filter");
    else next.set("filter", filterName);

    if (petType) next.set("petType", petType);
    else next.delete("petType");

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

  // ✅ NEW: save page + scroll when opening a product
  // IMPORTANT: do NOT navigate here — ProductCard's <Link> handles navigation
  function handleOpenProduct() {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    sessionStorage.setItem(OFFSET_KEY, String(itemOffset));
  }

  const title = petType
    ? `${petType[0].toUpperCase()}${petType.slice(1)} Products`
    : "All Products";

  return (
    <>
      {/* MAIN CONTENT */}
      <div className="container py-4">
        <h2 className="mb-2">{title}</h2>

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
              activeFilter === "supplies"
                ? "btn-primary"
                : "btn-outline-primary"
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
                onOpen={handleOpenProduct}
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

      {/* FOOTER (FULL WIDTH – MATCHES HOME) */}
      <footer className="w-100 bg-light border-top mt-5">
        <div className="container-fluid px-4 py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
            <div>© {new Date().getFullYear()} Paws & Claws Care</div>

            <div className="d-flex gap-3">
              <Link className="text-secondary text-decoration-none" to="/">
                Home
              </Link>

              <Link className="text-secondary text-decoration-none" to="/forum">
                Forum
              </Link>

              <Link className="text-secondary text-decoration-none" to="/about">
                About
              </Link>

              <Link
                className="text-secondary text-decoration-none"
                to="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
