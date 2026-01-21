import { Link } from "react-router-dom";

const categories = [
  {
    title: "Shop Dog",
    subtitle: "Food, treats, toys & more",
    icon: "bi-heart-pulse",
    color: "red",
    to: "/products?petType=dog",
  },
  {
    title: "Shop Cat",
    subtitle: "Food, litter, enrichment & more",
    icon: "bi-stars",
    color: "purple",
    to: "/products?petType=cat",
  },
  {
    title: "Treats",
    subtitle: "Training + everyday rewards",
    icon: "bi-emoji-smile",
    color: "green",
    to: "/products?filter=treats",
  },
  {
    title: "Health & Wellness",
    subtitle: "Joint, skin, digestion, calm",
    icon: "bi-capsule",
    color: "orange",
    to: "/products?filter=health",
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="page-hero border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            {/* LEFT */}
            <div className="col-12 col-lg-7">
              <h1 className="display-5 fw-bold">Paws & Claws Care</h1>

              <p className="lead text-secondary mt-3">
                Healthy essentials for dogs and cats. Food, treats, and wellness
                picks curated for everyday life. Stock up on the things your
                pets love (and need).
              </p>

              <div className="d-flex gap-2 mt-4 flex-wrap">
                <Link to="/products" className="btn btn-lg shop-btn">
                  Shop all products <i className="bi bi-arrow-right ms-2" />
                </Link>
              </div>

              <div className="d-flex gap-4 mt-4 text-secondary small flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-shield-check" />
                  Secure checkout
                </div>

                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-chat-dots" />
                  Friendly support
                </div>
              </div>
            </div>

            {/* RIGHT: Discussion Forum Box */}
            <div className="col-12 col-lg-5">
              <div className="card shadow-sm border-0 forum-box">
                <div className="card-body p-4">
                  <div className="d-flex gap-3 align-items-start">
                    <div className="forum-icon">
                      <i className="bi bi-chat-square-text" />
                    </div>

                    <div>
                      <div className="text-secondary small">Community</div>
                      <div className="fw-bold fs-5">Discussion Forum</div>
                      <p className="text-secondary small mb-0 mt-1">
                        Ask questions, share tips, and get recommendations from
                        other pet parents.
                      </p>
                    </div>
                  </div>

                  <hr className="my-3" />

                  <ul className="forum-bullets">
                    <li>Start a discussion</li>
                    <li>Browse recent posts</li>
                    <li>Get recommendations</li>
                  </ul>

                  <div className="d-grid mt-3">
                    <Link to="/forum" className="btn btn-primary">
                      Open <i className="bi bi-arrow-right ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* END RIGHT */}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container py-5">
        <div className="d-flex align-items-end justify-content-between mb-3">
          <div>
            <h2 className="fw-bold mb-1">Shop by category</h2>
            <p className="text-secondary mb-0">
              Quick links to the most-used sections.
            </p>
          </div>

          <Link className="link-primary text-decoration-none" to="/products">
            View all <i className="bi bi-chevron-right" />
          </Link>
        </div>

        <div className="row g-3">
          {categories.map((c) => (
            <div className="col-12 col-md-6 col-lg-3" key={c.title}>
              <Link to={c.to} className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0 home-card">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className={`home-pill pill-${c.color}`}>
                        <i className={`bi ${c.icon}`} />
                      </div>

                      <i className="bi bi-arrow-right text-secondary" />
                    </div>

                    <h5 className="mt-3 mb-1 fw-semibold text-dark">
                      {c.title}
                    </h5>
                    <p className="text-secondary mb-0">{c.subtitle}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER (FULL WIDTH) */}
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
    </div>
  );
}
