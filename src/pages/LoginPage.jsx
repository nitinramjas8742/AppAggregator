import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login API called with:", { email, password });
    // TODO: Replace with your actual login API call
  };

  return (
    <>
      <NavbarComponent/>
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
