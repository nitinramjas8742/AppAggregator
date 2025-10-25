import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Login failed");
      }

      const data = await response.json(); // expect { token: "..." }

      // Save JWT token to localStorage
      localStorage.setItem("token", data.token);

      console.log("Login successful, token:", data.token);

      // Redirect to home page or dashboard
      navigate("/");

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-title">Welcome Back 👋</h2>
          <p className="login-subtitle">Log in to continue to Indian Web Store</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group password-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-btn">
              Log In
            </button>

            <div className="login-footer">
              <p>
                Don’t have an account?{" "}
                <NavLink to="/signup" className="signup-link">
                  Sign Up
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
