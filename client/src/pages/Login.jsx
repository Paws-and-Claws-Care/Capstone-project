import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchMe, saveAuth } from "../api/auth";

// const API = "/api";

//login page function
export default function Login() {
  //stores username/password typed in username field
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //stores error message for failed login
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //runs when login form is submitted
  async function handleSubmit(e) {
    //prevent refresh and clear previous error message
    e.preventDefault();
    setError("");

    try {
      //send username and password to backend for backend to check credentials and return token
      const { token } = await loginUser({ username, password });

      const user = await fetchMe(token);

      saveAuth({ token, user });

      //send user to homepage after successful login
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  //boostrap layout for login page
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Log In</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          //update state with what is currently being typed in input
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
