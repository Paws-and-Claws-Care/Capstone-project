import { Link } from "react-router-dom";

const categories = [
  {
    title: "Shop Dog",
    subtitle: "Food, treats, toys & more",
    icon: "bi-heart-pulse",
    to: "/products?petType=dog",
  },
  {
    title: "Shop Cat",
    subtitle: "Food, litter, enrichment & more",
    icon: "bi-stars",
    to: "/products?petType=cat",
  },
  {
    title: "Treats",
    subtitle: "Training + everyday rewards",
    icon: "bi-emoji-smile",
    to: "/products?filter=treats",
  },
  {
    title: "Supplements",
    subtitle: "Joint, skin, digestion, calm",
    icon: "bi-capsule",
    to: "/products?filter=health",
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-light border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <h1 className="display-5 fw-bold">Paws & Claws Care</h1>

              <p className="lead text-secondary mt-3">
                Healthy essentials for dogs and cats. Food, treats, and
                supplements curated for everyday wellness. Stock up on the
                things your pets love (and need).
              </p>

              <div className="d-flex gap-2 mt-4 flex-wrap">
                <Link to="/products" className="btn btn-primary btn-lg">
                  Shop all products <i className="bi bi-arrow-right ms-2" />
                </Link>
              </div>

              <div className="d-flex gap-4 mt-4 text-secondary small">
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
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: 44,
                          height: 44,
                          backgroundColor: "rgba(13,110,253,.10)",
                        }}
                      >
                        <i className={`bi ${c.icon} fs-5 text-primary`} />
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

      {/* FOOTER */}
      <footer className="bg-light border-top">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
            <div>© {new Date().getFullYear()} Paws & Claws Care</div>

            <div className="d-flex gap-3">
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
