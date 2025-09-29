import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavbarComponent } from "../components/NavbarComponent";

export default function ContributePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    appName: "",
    category: "",
    description: "",
  });
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "Productivity",
    "Education",
    "Entertainment",
    "Finance",
    "Health",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, appName, category } = formData;
    if (!name || !email || !appName || !category) {
      alert("Please fill in Name, Email, App Name, and Category!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    console.log("Submitted Data:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", appName: "", category: "", description: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Full-width Navbar */}
      <div className="w-full">
        <NavbarComponent search={search} setSearch={setSearch} />
      </div>

      {/* Page content */}
      <div className="flex flex-col items-center flex-grow px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center"
        >
          Contribute to <span className="text-blue-600">LinkLooop</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-center max-w-2xl mb-8"
        >
          Help us make the platform better! Suggest web apps you want to see on
          our portal and provide your contact info so we can follow up.
        </motion.p>

        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-green-600 font-semibold"
          >
            Thank you! Your suggestion has been submitted.
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg mt-6"
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* App Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Web App Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="appName"
              value={formData.appName}
              onChange={handleChange}
              placeholder="Enter app name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              What is best about this app?
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe briefly..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit Suggestion
          </button>
        </form>
      </div>
    </div>
  );
}
