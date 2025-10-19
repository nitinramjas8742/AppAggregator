import React, { useState } from "react";
import logo from "../assets/link-looop-connectDiscoverFlow.png";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import InstallPWAButton from "./InstallPWAButton"; // ✅ added import

export function NavbarComponent({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/"; // true if on homepage

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contribute", path: "/contribute" },
  ];

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-[65px] gap-2">

        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="logo"
            className="h-12 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex lg:ml-6 lg:gap-x-6 items-center flex-shrink">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Tagline */}
        <div className="mx-2 font-bold text-sm whitespace-nowrap flex-shrink bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 animate-gradient-x">
          Indian Web Store
        </div>

        {/* Right side: search + login + mobile menu */}
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">

          {/* Search Bar */}
          <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 border border-gray-200 rounded-md focus-within:border-blue-500 transition-all">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={!isHome} // disables on all pages except homepage
              className={`w-32 sm:w-48 text-sm bg-transparent outline-none ${
                !isHome ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16" className="fill-gray-400">
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div>

          {/* Login/Signup button */}
          <NavLink
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition hidden lg:flex"
          >
            Login / Signup
          </NavLink>

          {/* ✅ Download App Button (only visible on mobile) */}
          <div className="block lg:hidden">
            <InstallPWAButton />
          </div>

          {/* Mobile menu button */}
          <button
            id="toggleOpen"
            className="lg:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile dropdown menu */}
          {menuOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 shadow-lg rounded-xl p-3 w-40 flex flex-col space-y-2 animate-fadeIn z-50">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-1 px-3 py-2 text-center rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Login / Signup
              </NavLink>

              {/* ✅ Download App also shown inside mobile dropdown */}
              <div className="mt-2 text-center">
                <InstallPWAButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
