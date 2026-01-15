import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-top bg-light">
      <div className="container py-4 d-flex justify-content-between align-items-center">
        <small className="text-muted">
          © {new Date().getFullYear()} Paws & Claws Care
        </small>

        <div className="d-flex gap-3">
          <Link to="/about" className="text-muted text-decoration-none">
            About
          </Link>
          <Link to="/contact" className="text-muted text-decoration-none">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
