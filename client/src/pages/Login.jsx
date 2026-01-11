import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchMe, saveAuth } from "../api/auth";

const API = "/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // 1) login -> { token }
      const { token } = await loginUser({ username, password });

      // 2) get the user -> user object
      const user = await fetchMe(token);

      // 3) store both
      saveAuth({ token, user });

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
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
