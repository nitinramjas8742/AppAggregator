// src/pages/ThankYouPage.jsx
import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function ThankYouPage() {
  const location = useLocation();
  const name = location.state?.name || "Friend";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-200 to-green-400 text-gray-800 px-4 text-center">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        🎉 Thank you, {name}!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl mb-8 max-w-xl"
      >
        We really appreciate your suggestion.  
        Our team will review it and we’ll add it soon to make the platform even better! 🚀
      </motion.p>

      <NavLink
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Back to Home Page
      </NavLink>
    </div>
  );
}
