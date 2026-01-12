import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import { getUser, logout } from "../api/auth";
import logo from "../assets/logo.png";

function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

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
    closeOffcanvas();
    // tiny delay so close starts before navigation
    window.setTimeout(() => navigate("/"), 10);
  }

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

        {/* RIGHT: Account dropdown */}
        <ul className="navbar-nav ms-auto flex-row gap-3">
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

                <li>
                  <Link className="dropdown-item" to="/cart">
                    Cart
                  </Link>
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
