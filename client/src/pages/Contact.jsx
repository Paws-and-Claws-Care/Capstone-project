import { Link } from "react-router-dom";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setSuccess(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSuccess(true);

    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div>
      {/* HEADER / HERO */}
      <section className="page-hero border-bottom">
        <div className="container py-5">
          {/* Large page title */}
          <h1 className="display-6 fw-bold mb-2">Contact Us</h1>

          {/* Short description below title */}
          <p className="lead text-secondary mb-0">
            Questions, feedback, or support? Send us a message and we’ll get
            back to you as soon as we can.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container py-5">
        {/* Bootstrap grid*/}
        <div className="row g-4">
          {/* LEFT: FORM CARD */}
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-1">Send a message</h2>

                <p className="text-secondary mb-3">
                  This form is currently a demo UI.
                </p>

                {/* Success alert when user submits */}
                {success && (
                  <div className="alert alert-success">
                    <i className="bi bi-check-circle me-2" />
                    Your message was sent successfully! We’ll be in touch soon.
                  </div>
                )}

                {/* The form uses controlled inputs: value comes from state, onChange updates state */}
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Name */}
                    <div className="col-12 col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-12 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    {/* Subject */}
                    <div className="col-12">
                      <label className="form-label">Subject</label>
                      <input
                        className="form-control"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Type your message here…"
                        required
                      />
                    </div>

                    {/* Buttons */}
                    <div className="col-12 d-flex gap-2 flex-wrap">
                      {/* Submit triggers handleSubmit */}
                      <button className="btn btn-primary" type="submit">
                        <i className="bi bi-send me-2" />
                        Send message
                      </button>

                      {/* Link back home*/}
                      <Link className="btn btn-outline-secondary" to="/">
                        <i className="bi bi-house me-2" />
                        Back to home
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT INFO CARD */}
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-3">Contact info</h2>

                {/* Email block */}
                <div className="d-flex gap-3 mb-3">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "rgba(13,110,253,.10)",
                    }}
                  >
                    <i className="bi bi-envelope text-primary" />
                  </div>
                  <div>
                    <div className="fw-semibold">Email</div>
                    <div className="text-secondary small">
                      support@pawsandclawscare.com
                    </div>
                  </div>
                </div>

                {/* Hours block */}
                <div className="d-flex gap-3 mb-3">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "rgba(25,135,84,.10)",
                    }}
                  >
                    <i className="bi bi-clock text-success" />
                  </div>
                  <div>
                    <div className="fw-semibold">Support hours</div>
                    <div className="text-secondary small">
                      Mon–Fri • 9am–5pm
                    </div>
                  </div>
                </div>

                {/* Location block */}
                <div className="d-flex gap-3">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "rgba(255,193,7,.15)",
                    }}
                  >
                    <i className="bi bi-geo-alt text-warning" />
                  </div>
                  <div>
                    <div className="fw-semibold">Location</div>
                    <div className="text-secondary small">
                      Online storefront (Capstone Project)
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Quick navigation buttons */}
                <div className="d-grid gap-2">
                  <Link className="btn btn-outline-primary" to="/about">
                    <i className="bi bi-info-circle me-2" />
                    Learn about the project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-light border-top mt-5">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
            <div>© {new Date().getFullYear()} Paws & Claws Care</div>

            <div className="d-flex gap-3">
              <Link className="text-secondary text-decoration-none" to="/">
                Home
              </Link>
              <Link className="text-secondary text-decoration-none" to="/about">
                About
              </Link>
              <Link className="text-secondary text-decoration-none" to="/forum">
                Forum
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
