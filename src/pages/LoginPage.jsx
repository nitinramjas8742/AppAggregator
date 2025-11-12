import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent";
import "./LoginPage.css";
import AuthContext from "../context/AuthContext"; // ✅ import context

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ access login function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
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

      const data = await response.json(); // expects { token: "..." }
      if (!data?.token) {
        throw new Error("Invalid response: missing token");
      }

      // ✅ Persist token and update context
      login(data.token);
      localStorage.setItem("token", data.token);

      // ✅ Notify app instantly (Homepage updates without refresh)
      window.dispatchEvent(new Event("loginStatusChanged"));

      // ✅ Redirect to homepage
      navigate("/");

    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message || "Something went wrong");
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
