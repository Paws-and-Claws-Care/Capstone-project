// About.jsx
// This page explains what the capstone project is, why it was built,
// and highlights the tech stack (frontend, backend, database) using Bootstrap cards.

import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      {/* HEADER / HERO SECTION */}
      <section className="bg-light border-bottom">
        <div className="container py-5">
          <h1 className="display-6 fw-bold mb-2">About Paws & Claws Care</h1>

          <p className="lead text-secondary mb-0">
            Paws & Claws Care is a full-stack e-commerce application built as a
            capstone project. The goal of this project is to provide a clean,
            user-friendly experience for shopping pet wellness essentials.
          </p>
        </div>
      </section>

      {/* MISSION + PROJECT INFO SECTION */}
      <section className="container py-5">
        <div className="row g-4">
          {/* LEFT COLUMN */}
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-3">Our mission</h2>
                <p className="text-secondary mb-3">
                  We created Paws & Claws Care to make shopping for pet wellness
                  products simple and approachable. The app focuses on common
                  essentials like food, treats, and supplements while
                  demonstrating full-stack development skills.
                </p>

                <h3 className="h5 fw-bold mb-2">Project goals</h3>
                <ul className="text-secondary mb-0">
                  <li>Build a full-stack React and Express application</li>
                  <li>Implement authentication and protected routes</li>
                  <li>Design a relational PostgreSQL database</li>
                  <li>Create a clean, responsive user interface</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-3">Why we built it</h2>
                <p className="text-secondary">
                  This project demonstrates how a modern e-commerce application
                  is built from the ground up, including frontend routing,
                  backend APIs, authentication, and database relationships.
                </p>

                <div className="d-grid gap-2 mt-4">
                  <Link className="btn btn-primary" to="/products">
                    Shop products <i className="bi bi-arrow-right ms-2" />
                  </Link>

                  <Link className="btn btn-outline-primary" to="/">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="container py-5">
        <div className="mb-4">
          <h2 className="fw-bold">Project Tech Stack</h2>
          <p className="text-secondary mb-0">
            Tools and technologies used to build the Paws & Claws Care
            application.
          </p>
        </div>

        <div className="row g-3">
          {/* FRONTEND */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">
                  <i className="bi bi-window me-2 text-primary" />
                  Frontend
                </h5>

                <ul className="text-secondary mb-0">
                  <li>React 19</li>
                  <li>Vite (dev server & build tool)</li>
                  <li>React Router / React Router DOM</li>
                  <li>Axios (API requests)</li>
                  <li>Bootstrap 5</li>
                  <li>React-Bootstrap</li>
                  <li>Bootstrap Icons</li>
                  <li>React Paginate (pagination)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* BACKEND */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">
                  <i className="bi bi-hdd-network me-2 text-success" />
                  Backend
                </h5>

                <ul className="text-secondary mb-0">
                  <li>Node.js (22+)</li>
                  <li>Express.js</li>
                  <li>RESTful API</li>
                  <li>JWT Authentication (jsonwebtoken)</li>
                  <li>Password hashing (bcrypt)</li>
                  <li>UUID (unique IDs)</li>
                  <li>Nodemon (development workflow)</li>
                  <li>Environment variables (.env)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* DATABASE */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">
                  <i className="bi bi-database me-2 text-warning" />
                  Database
                </h5>

                <ul className="text-secondary mb-0">
                  <li>PostgreSQL</li>
                  <li>pg (Postgres client)</li>
                  <li>Schema & Seed scripts</li>
                  <li>Relational Data Modeling</li>
                  <li>Join Tables (Orders & Products)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM (white background) */}
      <section className="border-top">
        <div className="container py-5">
          <div className="row g-3 align-items-center">
            <div className="col-12">
              <h2 className="h4 fw-bold mb-1">Meet the team</h2>
              <p className="text-secondary mb-0">
                Built collaboratively by the Paws & Claws Care capstone team.
                Team member names and roles can be added here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (grey background like Home) */}
      <footer className="bg-light border-top">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
            <div>© {new Date().getFullYear()} Paws & Claws Care</div>

            <div className="d-flex gap-3">
              <Link className="text-secondary text-decoration-none" to="/">
                Home
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
