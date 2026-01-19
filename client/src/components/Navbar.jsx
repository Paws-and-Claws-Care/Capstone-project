// client/src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import { getUser, logout } from "../api/auth";
import logo from "../assets/logo.png";
import { useActivePet } from "../context/ActivePetContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const { pets, activePetId, setActivePet } = useActivePet();
  const { itemCount, refreshCart } = useCart();

  const [petType, setPetType] = useState("");
  const [search, setSearch] = useState("");

  // Offcanvas
  const offcanvasRef = useRef(null);
  const offcanvasInstanceRef = useRef(null);

  // Profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null);

  function cleanupBackdropAndBody() {
    document.querySelectorAll(".offcanvas-backdrop").forEach((b) => b.remove());
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  useEffect(() => {
    const el = offcanvasRef.current;
    if (!el) return;

    offcanvasInstanceRef.current = Offcanvas.getOrCreateInstance(el);

    const onHidden = () => cleanupBackdropAndBody();
    el.addEventListener("hidden.bs.offcanvas", onHidden);

    return () => {
      el.removeEventListener("hidden.bs.offcanvas", onHidden);
      offcanvasInstanceRef.current?.dispose();
      offcanvasInstanceRef.current = null;
      cleanupBackdropAndBody();
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function openOffcanvas() {
    const el = offcanvasRef.current;
    if (!el) return;

    cleanupBackdropAndBody();
    const inst = Offcanvas.getOrCreateInstance(el);
    offcanvasInstanceRef.current = inst;
    inst.show();
  }

  function closeOffcanvas() {
    offcanvasInstanceRef.current?.hide();
  }

  function handleLogout() {
    logout();
    refreshCart?.();
    closeOffcanvas();
    setProfileOpen(false);
    window.setTimeout(() => navigate("/"), 10);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!petType || !search.trim()) return;

    navigate(
      `/products/pet/${petType}?search=${encodeURIComponent(search.trim())}`
    );

    setSearch("");
    setPetType("");
  }

  function toggleProfileMenu() {
    const rect = profileBtnRef.current?.getBoundingClientRect();
    if (rect) {
      document.documentElement.style.setProperty(
        "--profile-menu-top",
        `${rect.bottom + 8}px`
      );
      document.documentElement.style.setProperty(
        "--profile-menu-right",
        `${Math.max(8, window.innerWidth - rect.right)}px`
      );
    }
    setProfileOpen((v) => !v);
  }

  const cartDisabled = !user || !activePetId;

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center flex-wrap gap-2">
        {/* LEFT: Brand + Hamburger */}
        <div className="d-flex align-items-center gap-2">
          <Link
            className="navbar-brand m-0 p-0 d-flex align-items-center"
            to="/"
          >
            <img src={logo} alt="Paws & Claws" className="nav-logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={openOffcanvas}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        {/* MIDDLE: Pet selector + Search (keeps original sizing) */}
        <div className="d-flex align-items-center flex-wrap gap-3 pcs-middle">
          {user && (
            <>
              {pets.length ? (
                <select
                  className="form-select form-select-sm pcs-active-pet"
                  value={activePetId ?? ""}
                  onChange={(e) => setActivePet(e.target.value)}
                  aria-label="Select active pet"
                >
                  {pets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.pet_type})
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-muted small">No pets yet</span>
              )}
            </>
          )}

          <form
            className="d-flex align-items-center gap-2 pcs-search"
            onSubmit={handleSearchSubmit}
          >
            <select
              className="form-select form-select-sm"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              aria-label="Choose dog or cat"
              required
            >
              <option value="" disabled>
                Pet
              </option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>

            <input
              className="form-control form-control-sm"
              type="search"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn btn-outline-primary btn-sm" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* RIGHT: Auth/Profile pinned to the right */}
        <div className="ms-auto" ref={profileRef}>
          {!user ? (
            <div className="d-flex align-items-center gap-3">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </div>
          ) : (
            <div className="profileDropdown">
              <button
                ref={profileBtnRef}
                className="nav-link btn btn-link p-0 profileBtn"
                type="button"
                onClick={toggleProfileMenu}
                aria-expanded={profileOpen}
                style={{ textDecoration: "none" }}
              >
                Hi, {user.username} ▾
              </button>

              {profileOpen && (
                <div
                  className="profileMenu"
                  role="menu"
                  aria-label="Profile menu"
                >
                  <div
                    className="profileItem"
                    role="menuitem"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </div>

                  <div className="profileDivider" />

                  <div
                    className={`profileItem ${
                      cartDisabled ? "disabledItem" : ""
                    }`}
                    role="menuitem"
                    onClick={() => {
                      if (cartDisabled) return;
                      setProfileOpen(false);
                      navigate("/cart");
                    }}
                  >
                    <span>Cart</span>
                    {Number(itemCount) > 0 && (
                      <span className="badge text-bg-primary ms-2">
                        {itemCount}
                      </span>
                    )}
                  </div>

                  {cartDisabled && (
                    <div className="profileHint">
                      Select an active pet to view cart
                    </div>
                  )}

                  <div className="profileDivider" />

                  <div
                    className="profileItem"
                    role="menuitem"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/pets");
                    }}
                  >
                    My Pets
                  </div>

                  <div className="profileDivider" />

                  <div
                    className="profileItem"
                    role="menuitem"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/forum");
                    }}
                  >
                    Discussion Forum
                  </div>

                  <div className="profileDivider" />

                  <div
                    className="profileItem logoutBtn"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* OFFCANVAS MENU */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mainMenu"
          aria-labelledby="mainMenuLabel"
          ref={offcanvasRef}
        >
          <div className="offcanvas-header">
            <div />
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeOffcanvas}
            />
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={closeOffcanvas}>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link w-100 text-start d-flex justify-content-between align-items-center"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#productsMenu"
                  aria-expanded="false"
                  aria-controls="productsMenu"
                  style={{ textDecoration: "none" }}
                >
                  Products <span className="ms-2">▾</span>
                </button>

                <div className="collapse" id="productsMenu">
                  <ul className="navbar-nav ms-3">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/products/pet/dog"
                        onClick={closeOffcanvas}
                      >
                        Dog
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/products/pet/cat"
                        onClick={closeOffcanvas}
                      >
                        Cat
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/products"
                        onClick={closeOffcanvas}
                      >
                        All Products
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
