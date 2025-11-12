import React, { useState, useContext } from "react";
import "./SignupPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent";
import AuthContext from "../context/AuthContext"; // ✅ import context

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ get login method from context

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Simple password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }

      // ✅ If backend returns a token after signup
      if (data.token) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);

        // ✅ Log user into global context
        login(data.token);

        // ✅ Notify homepage instantly (no refresh needed)
        window.dispatchEvent(new Event("loginStatusChanged"));

        // ✅ Redirect to homepage
        navigate("/");
      } else {
        // If backend doesn't return a token
        alert(data.message || "Signup successful! Please log in.");
        navigate("/login");
      }

    } catch (err) {
      console.error("❌ Signup error:", err);
      setError("Error connecting to server. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="signup-page">
        <div className="signup-container">
          <h2 className="signup-title">Create Account 🚀</h2>
          <p className="signup-subtitle">Join Indian Web Store today</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group password-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="form-group password-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="signup-footer">
              <p>
                Already have an account?{" "}
                <NavLink to="/login" className="login-link">
                  Log In
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
