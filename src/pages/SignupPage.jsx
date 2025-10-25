import React, { useState } from "react";
import "./SignupPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent";

export default function SignupPage() {
  const navigate = useNavigate(); // for redirecting after signup

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

    // Validate passwords match on frontend
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Signup successful!");
        navigate("/login"); // redirect to login page
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
