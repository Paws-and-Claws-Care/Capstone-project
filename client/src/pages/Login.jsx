import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../auth";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text(); // ✅ always works
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        // This is the key: shows what you actually got back (often HTML)
        throw new Error(
          `Server did not return JSON. Status ${
            res.status
          }. Response: ${text.slice(0, 200)}`
        );
      }

      if (!res.ok) {
        throw new Error(data?.error || `Login failed (status ${res.status})`);
      }

      saveAuth(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Log In</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">Log In</button>
      </form>
    </div>
  );
}
