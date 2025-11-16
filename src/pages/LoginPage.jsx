import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent";
import "./LoginPage.css";
import AuthContext from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);   // ✅ NEW

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // ✅ Start loading

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Login failed");
      }

      const data = await response.json();
      if (!data?.token) {
        throw new Error("Invalid response: missing token");
      }

      login(data.token);
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("loginStatusChanged"));
      navigate("/");

    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message || "Something went wrong");

    } finally {
      setLoading(false); // ✅ Stop loading
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

            <button
              type="submit"
              className="login-btn"
              disabled={loading} // ✅ Disable while loading
            >
              {loading ? "Logging in..." : "Log In"} {/* ✅ Text change */}
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
