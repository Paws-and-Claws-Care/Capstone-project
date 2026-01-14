import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import { getUser, logout } from "../api/auth";
import logo from "../assets/logo.png";
import { useActivePet } from "../context/ActivePetContext";
import { useCart } from "../context/CartContext";




function Navbar() {
  const user = getUser();
  const navigate = useNavigate();
  const { pets, activePetId, setActivePet } = useActivePet();

  // ✅ backend cart context
  const { itemCount, refreshCart } = useCart();

  const offcanvasRef = useRef(null);
  const offcanvasInstanceRef = useRef(null);

  // Strong cleanup if Bootstrap leaves backdrop/body in a weird state
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

    // When Bootstrap says it's fully hidden, clean up any leftovers
    const onHidden = () => cleanupBackdropAndBody();

    el.addEventListener("hidden.bs.offcanvas", onHidden);

    return () => {
      el.removeEventListener("hidden.bs.offcanvas", onHidden);
      offcanvasInstanceRef.current?.dispose();
      offcanvasInstanceRef.current = null;
      cleanupBackdropAndBody();
    };
  }, []);

  function openOffcanvas() {
    const el = offcanvasRef.current;
    if (!el) return;

    // If anything got stuck from a previous open, clean it first
    cleanupBackdropAndBody();

    // Ensure we have an instance, then show
    const inst = Offcanvas.getOrCreateInstance(el);
    offcanvasInstanceRef.current = inst;
    inst.show();
  }

  function closeOffcanvas() {
    offcanvasInstanceRef.current?.hide();
  }

  function handleLogout() {
    logout();

    // ✅ clear any stale cart badge after logout
    // (refreshCart will set cartData to null because activePet/user are gone)
    refreshCart?.();

    closeOffcanvas();
    // tiny delay so close starts before navigation
    window.setTimeout(() => navigate("/"), 10);
  }

  const showCart = Boolean(user);
  const cartDisabled = !user || !activePetId;

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center">
        {/* LEFT: Brand + Hamburger */}
        <div className="d-flex align-items-center gap-2">
          <Link
            className="navbar-brand m-0 p-0 d-flex align-items-center"
            to="/"
          >
            <img src={logo} alt="Paws & Claws" style={{ height: "120px" }} />
          </Link>

          {/* IMPORTANT: no data-bs-toggle/target here */}
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={openOffcanvas}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        {/* RIGHT: Active Pet + Account */}
        <ul className="navbar-nav ms-auto flex-row gap-3 align-items-center">
          {/* Active Pet Selector (only when logged in) */}
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
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ textDecoration: "none" }}
              >
                Hi, {user.username}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink className="dropdown-item" to="/profile">
                    Profile
                  </NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* ✅ Cart (backend) + badge */}
                {showCart && (
                  <li>
                    <NavLink
                      className={`dropdown-item d-flex justify-content-between align-items-center ${
                        cartDisabled ? "disabled" : ""
                      }`}
                      to={cartDisabled ? "#" : "/cart"}
                      onClick={(e) => {
                        if (cartDisabled) {
                          e.preventDefault();
                          return;
                        }
                      }}
                    >
                      <span>Cart</span>
                      {Number(itemCount) > 0 && (
                        <span className="badge text-bg-primary ms-2">
                          {itemCount}
                        </span>
                      )}
                    </NavLink>

                    {/* Optional hint if no active pet */}
                    {cartDisabled && (
                      <div className="dropdown-item-text text-muted small">
                        Select an active pet to view cart
                      </div>
                    )}
                  </li>
                )}

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/pets">
                    My Pets
                  </NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>

      {/* OFFCANVAS */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mainMenu"
        aria-labelledby="mainMenuLabel"
        ref={offcanvasRef}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mainMenuLabel">
            Menu
          </h5>

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

            {/* Products collapse */}
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

            {/* (Optional) Add Cart link inside offcanvas too */}
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
