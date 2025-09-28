import React from "react";
import logo from "../assets/link-looop-connectDiscoverFlow.png";
import { NavLink } from "react-router-dom"; // ✅ use NavLink for active detection

export function NavbarComponent({ search, setSearch }) {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-[65px]">
        
        {/* Logo (desktop) */}
        <NavLink to="/" className="hidden sm:block">
          <img
            src={logo}
            alt="logo"
            className="h-12 w-auto object-contain"
          />
        </NavLink>

        {/* Logo (mobile) */}
        <NavLink to="/" className="sm:hidden">
          <img
            src={logo}
            alt="logo"
            className="h-8 w-auto object-contain"
          />
        </NavLink>

        {/* Menu (links) */}
        <div
          id="collapseMenu"
          className="max-lg:hidden lg:block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <ul className="lg:flex lg:ml-10 lg:gap-x-6 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[280px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <NavLink to="/">
                <img
                  src={logo}
                  alt="logo"
                  className="h-10 w-auto object-contain"
                />
              </NavLink>
            </li>

            {/* Links */}
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Contribute", path: "/contribute" },
            ].map((link) => (
              <li key={link.name} className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-3">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium block lg:hover:text-blue-600 ${
                      isActive ? "text-blue-600" : "text-gray-700"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side (search + mobile menu button) */}
        <div className="flex items-center gap-4 ml-auto">
          {/* 🔍 Search Bar */}
          <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 border border-gray-200 rounded-md focus-within:border-blue-500 transition-all">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-32 sm:w-48 text-sm bg-transparent outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16"
              className="fill-gray-400"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div>

          {/* Mobile menu button */}
          <button id="toggleOpen" className="lg:hidden cursor-pointer">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
