import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const { handleLogin, loading } = useAuth(); // ✅ FIXED
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  async function handlesubmit(e) {
    e.preventDefault();

    try {
      const res = await handleLogin(username, password);
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handlesubmit}>
          <input
            onChange={(e) => setusername(e.target.value)}
            type="text"
            name="username"
            placeholder="Enter username"
          />

          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;