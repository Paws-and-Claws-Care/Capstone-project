// Contact.jsx
// This page shows a contact form (demo UI) and a sidebar with contact info.
// When the user submits the form, we show a Bootstrap success message in the UI.
// (No backend/email sending yet — this is a frontend-only demo.)

import { Link } from "react-router-dom"; // Link lets us navigate without reloading the page
import { useState } from "react"; // useState lets us store form data + UI state

export default function Contact() {
  // form state holds the values typed into the inputs
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // success controls whether we show the green “message sent” alert
  const [success, setSuccess] = useState(false);

  // handleChange runs every time the user types in any input
  function handleChange(e) {
    const { name, value } = e.target; // "name" matches the input name attr, "value" is what user typed

    // update just the one field the user changed
    setForm((prev) => ({ ...prev, [name]: value }));

    // if the user starts typing again after submitting, hide the success alert
    setSuccess(false);
  }

  // handleSubmit runs when the user clicks "Send message"
  function handleSubmit(e) {
    e.preventDefault(); // prevents the browser from refreshing the page

    // In a real app, we'd POST this form to the backend here.
    // For now, we show a success message to demonstrate UI behavior.
    setSuccess(true);

    // clear the form after “sending”
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div>
      {/* HEADER / HERO */}
      <section className="bg-light border-bottom">
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
        {/* Bootstrap grid: form on left, info card on right */}
        <div className="row g-4">
          {/* LEFT: FORM CARD */}
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-1">Send a message</h2>

                {/* Small note to clarify this is demo-only */}
                <p className="text-secondary mb-3">
                  This form is currently a demo UI.
                </p>

                {/* Success alert: only shows after user submits */}
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
                        name="name" // IMPORTANT: must match key in form state
                        value={form.name} // controlled value from state
                        onChange={handleChange} // updates state on typing
                        placeholder="Your name"
                        required // browser validation
                      />
                    </div>

                    {/* Email */}
                    <div className="col-12 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="email" // helps browser validate email format
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

                      {/* Link back home (client-side navigation, no refresh) */}
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
                  <Link className="btn btn-outline-primary" to="/products">
                    <i className="bi bi-bag me-2" />
                    Browse products
                  </Link>
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

      {/* Footer */}

      <section className="bg-light border-top">
        <div className="container py-4 text-secondary small d-flex flex-column flex-md-row justify-content-between gap-2">
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
          </div>
        </div>
      </section>
    </div>
  );
}
