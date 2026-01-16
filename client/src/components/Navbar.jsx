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

  const showCart = Boolean(user);
  const cartDisabled = !user || !activePetId;

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* LEFT: Brand + Hamburger */}
        <div className="d-flex align-items-center gap-2">
          <Link
            className="navbar-brand m-0 p-0 d-flex align-items-center"
            to="/"
          >
            <img src={logo} alt="Paws & Claws" style={{ height: "120px" }} />
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

        {/* RIGHT: Active Pet + Search + Account */}
        <ul className="navbar-nav flex-row gap-3 align-items-center ms-auto">
          {/* Active Pet Selector (logged in) */}
          {user && (
            <li className="nav-item">
              {pets.length ? (
                <select
                  className="form-select form-select-sm"
                  style={{ width: 220 }}
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
            </li>
          )}

          {/* Search */}
          <li className="nav-item">
            <form
              className="d-flex align-items-center"
              onSubmit={handleSearchSubmit}
            >
              <select
                className="form-select form-select-sm me-2"
                style={{ width: 90 }}
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
                className="form-control form-control-sm me-2"
                style={{ width: 200 }}
                type="search"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button className="btn btn-outline-primary btn-sm" type="submit">
                Search
              </button>
            </form>
          </li>

          {/* Auth links OR profile dropdown */}
          {!user ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item profileDropdown" ref={profileRef}>
              <button
                className="nav-link btn btn-link p-0 profileBtn"
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                aria-expanded={profileOpen}
                style={{ textDecoration: "none" }}
              >
                Hi, {user.username} ▾
              </button>

              {profileOpen && (
                <div className="profileMenu">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </button>

                  <div className="profileDivider" />

                  {showCart && (
                    <>
                      <button
                        type="button"
                        disabled={cartDisabled}
                        onClick={() => {
                          if (cartDisabled) return;
                          setProfileOpen(false);
                          navigate("/cart");
                        }}
                        className={cartDisabled ? "disabledItem" : ""}
                      >
                        <span>Cart</span>
                        {Number(itemCount) > 0 && (
                          <span className="badge text-bg-primary ms-2">
                            {itemCount}
                          </span>
                        )}
                      </button>

                      {cartDisabled && (
                        <div className="profileHint">
                          Select an active pet to view cart
                        </div>
                      )}

                      <div className="profileDivider" />
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/pets");
                    }}
                  >
                    My Pets
                  </button>

                  <div className="profileDivider" />

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/forum");
                    }}
                  >
                    Discussion Forum
                  </button>

                  <div className="profileDivider" />

                  <button
                    type="button"
                    className="logoutBtn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* OFFCANVAS (RIGHT SIDE) */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mainMenu"
        aria-labelledby="mainMenuLabel"
        ref={offcanvasRef}
      >
        {/* No "Menu" text/title, just a close button */}
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

            {/* UNBOLD "Discussion Forum": use Link (not NavLink) */}
            <li className="nav-item">
              <Link className="nav-link" to="/forum" onClick={closeOffcanvas}>
                Discussion Forum
              </Link>
            </li>

            {/* Removed About + Contact */}

            {user && (
              <li className="nav-item mt-2">
                <NavLink
                  className={`nav-link d-flex justify-content-between align-items-center ${
                    cartDisabled ? "disabled" : ""
                  }`}
                  to={cartDisabled ? "#" : "/cart"}
                  onClick={(e) => {
                    if (cartDisabled) {
                      e.preventDefault();
                      return;
                    }
                    closeOffcanvas();
                  }}
                >
                  <span>Cart</span>
                  {Number(itemCount) > 0 && (
                    <span className="badge text-bg-primary ms-2">
                      {itemCount}
                    </span>
                  )}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
