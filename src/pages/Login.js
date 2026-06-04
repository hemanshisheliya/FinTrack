import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error] = useState("");

  const staticUser = {
    email: "admin@gmail.com",
    password: "123456",
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Empty field validation
    if (!formData.email || !formData.password) {
          alert("Please fill all fields");
      return;
    }

    // Static credential check
    if (
      formData.email === staticUser.email &&
      formData.password === staticUser.password
    ) {
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Login Successful ✅");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password, email:admin@gmail.com and password:123456");
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <img src="/Image/FinTrack.png" alt="FinTrack" />

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email/Contact no:</label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="🖂 Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="🔒 Enter your password"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember me
            </label>

            <a href="/" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;