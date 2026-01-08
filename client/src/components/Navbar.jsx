import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "12px" }}>
        Home
      </Link>
      <Link to="/products" style={{ marginRight: "12px" }}>
        Products
      </Link>
      <Link to="/favorites" style={{ marginRight: "12px" }}>
        Favorites
      </Link>
      <Link to="/login" style={{ marginRight: "12px" }}>
        Login
      </Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Navbar;
