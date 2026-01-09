// export default function Home() {
//   return (
//     <div style={{ padding: 40 }}>
//       <h1>HOME IS RENDERING ✅</h1>
//     </div>
//   );
// }

// // function Home() {
// //   return <h2>Home</h2>;
// // }

// // export default Home;

import { Link } from "react-router-dom";

const categories = [
  {
    title: "Shop Dog",
    subtitle: "Food, treats, toys & more",
    icon: "bi-heart-pulse",
    to: "/products?pet=dog",
  },
  {
    title: "Shop Cat",
    subtitle: "Food, litter, enrichment & more",
    icon: "bi-stars",
    to: "/products?pet=cat",
  },
  {
    title: "Treats",
    subtitle: "Training + everyday rewards",
    icon: "bi-emoji-smile",
    to: "/products?category=treats",
  },
  {
    title: "Supplements",
    subtitle: "Joint, skin, digestion, calm",
    icon: "bi-capsule",
    to: "/products?category=supplements",
  },
];

// Temporary “best sellers” until your API is hooked up
const bestSellers = [
  { id: 1, name: "Salmon Skin & Coat Chews", price: 18.99, tag: "Top Rated" },
  { id: 2, name: "Chicken Training Treats", price: 9.99, tag: "Best Seller" },
  { id: 3, name: "Sensitive Stomach Kibble", price: 44.99, tag: "Popular" },
  { id: 4, name: "Calming Soft Chews", price: 16.49, tag: "New" },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-light border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <span className="badge text-bg-success mb-3">
                Free shipping on $49+
              </span>

              <h1 className="display-5 fw-bold">
                Healthy essentials for dogs & cats — delivered fast.
              </h1>

              <p className="lead text-secondary mt-3">
                Food, treats, and supplements curated for everyday wellness.
                Stock up on the things your pets love (and need).
              </p>

              <div className="d-flex gap-2 mt-4 flex-wrap">
                <Link to="/products" className="btn btn-primary btn-lg">
                  Shop all products <i className="bi bi-arrow-right ms-2" />
                </Link>
                <Link
                  to="/products?category=supplements"
                  className="btn btn-outline-primary btn-lg"
                >
                  Browse supplements
                </Link>
              </div>

              <div className="d-flex gap-4 mt-4 text-secondary small">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-shield-check" />
                  Secure checkout
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-truck" />
                  Quick delivery
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-chat-dots" />
                  Friendly support
                </div>
              </div>
            </div>

            {/* Hero image placeholder (simple Bootstrap “card image” style) */}
            <div className="col-12 col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                  <div
                    className="w-100"
                    style={{
                      aspectRatio: "16 / 10",
                      background:
                        "linear-gradient(135deg, rgba(13,110,253,.15), rgba(25,135,84,.15))",
                      borderTopLeftRadius: "0.375rem",
                      borderTopRightRadius: "0.375rem",
                    }}
                  />
                  <div className="p-4">
                    <h5 className="fw-semibold mb-1">Paws & Claws Care</h5>
                    <p className="text-secondary mb-0">
                      Build your pet’s routine: nutrition + treats + wellness.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-secondary small mt-2 mb-0">
                (Swap this for a real dog/cat banner image when you’re ready.)
              </p>
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

      {/* BEST SELLERS */}
      <section className="bg-light border-top border-bottom">
        <div className="container py-5">
          <div className="d-flex align-items-end justify-content-between mb-3">
            <div>
              <h2 className="fw-bold mb-1">Best sellers</h2>
              <p className="text-secondary mb-0">
                Popular picks your customers keep coming back for.
              </p>
            </div>
            <Link className="link-primary text-decoration-none" to="/products">
              Shop best sellers <i className="bi bi-chevron-right" />
            </Link>
          </div>

          <div className="row g-3">
            {bestSellers.map((p) => (
              <div className="col-12 col-md-6 col-lg-3" key={p.id}>
                <div className="card h-100 shadow-sm border-0">
                  <div
                    className="card-img-top"
                    style={{
                      aspectRatio: "4 / 3",
                      background:
                        "linear-gradient(135deg, rgba(25,135,84,.15), rgba(13,110,253,.10))",
                    }}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge text-bg-secondary">{p.tag}</span>
                      <span className="fw-bold">${p.price.toFixed(2)}</span>
                    </div>
                    <h6 className="mt-2 mb-3">{p.name}</h6>

                    <div className="d-grid gap-2">
                      <Link
                        to={`/products/${p.id}`}
                        className="btn btn-outline-primary"
                      >
                        View details
                      </Link>
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        Add to cart (hook up later)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-secondary small mt-3 mb-0">
            When your API is ready, we’ll replace this with real product data.
          </p>
        </div>
      </section>

      {/* PROMO STRIP */}
      <section className="container py-5">
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="p-4 p-lg-5 rounded-3 border shadow-sm h-100">
              <h3 className="fw-bold mb-2">Subscribe & save</h3>
              <p className="text-secondary mb-4">
                Get monthly essentials delivered automatically. Cancel anytime.
              </p>
              <Link to="/products" className="btn btn-success">
                Start shopping <i className="bi bi-arrow-right ms-2" />
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="p-4 rounded-3 bg-dark text-white shadow-sm h-100">
              <h5 className="fw-semibold">New customer?</h5>
              <p className="text-white-50 mb-3">
                Create an account to track orders and save favorites.
              </p>
              <div className="d-grid gap-2">
                <Link to="/register" className="btn btn-light">
                  Create account
                </Link>
                <Link to="/login" className="btn btn-outline-light">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-light border-top">
        <div className="container py-5">
          <div className="row align-items-center g-3">
            <div className="col-12 col-lg-7">
              <h4 className="fw-bold mb-1">Get updates & pet wellness tips</h4>
              <p className="text-secondary mb-0">
                Occasional emails. No spam. Unsubscribe anytime.
              </p>
            </div>
            <div className="col-12 col-lg-5">
              <form className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email address"
                  aria-label="Email address"
                />
                <button className="btn btn-primary btn-lg" type="button">
                  Join
                </button>
              </form>
              <div className="text-secondary small mt-2">
                We’ll wire this up later when you add email functionality.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
          <div>© {new Date().getFullYear()} Paws & Claws Care</div>
          <div className="d-flex gap-3">
            <Link
              className="text-secondary text-decoration-none"
              to="/products"
            >
              Shop
            </Link>
            <Link className="text-secondary text-decoration-none" to="/about">
              About
            </Link>
            <Link className="text-secondary text-decoration-none" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
