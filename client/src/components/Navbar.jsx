import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUser, logout } from "../auth";
import logo from "../assets/logo.png";

function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
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

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        {/* RIGHT: Account (always visible, not inside hamburger) */}
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

      {/* COLLAPSIBLE MENU (hamburger dropdown) */}
      <div className="container-fluid">
        <div className="collapse navbar-collapse mt-2" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* Home */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            {/* Products dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ textDecoration: "none" }}
              >
                Products
              </button>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/products/pet/dog">
                    Dog
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/pet/cat">
                    Cat
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/products">
                    All Products
                  </Link>
                </li>
              </ul>
            </li>

            {/* Favorites – only show when logged in */}
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">
                  Favorites
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
