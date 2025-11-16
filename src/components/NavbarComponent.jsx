import React, { useContext, useState } from "react";
import logo from "../assets/link-looop-connectDiscoverFlow.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import InstallPWAButton from "./InstallPWAButton";
import AuthContext from "../context/AuthContext";
import { User } from "lucide-react";

export function NavbarComponent({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false); // modal trigger

  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contribute", path: "/contribute" },
  ];

  const desktopLinks = [...navLinks];
  if (isLoggedIn) {
    desktopLinks.push({ name: "Premium Apps", path: "/premium" });
  }

  // ✅ LOGOUT with centered modal + 3 sec delay
  const handleLogout = () => {
    setLogoutLoading(true);

    setTimeout(() => {
      logout();
      navigate("/");
      setLogoutLoading(false);
    }, 2000); // 3 seconds
  };

  const renderAvatar = (name) => {
    if (!name)
      return <User size={20} className="text-white drop-shadow-sm" />;

    return (
      <span className="text-sm font-semibold text-white">
        {name.charAt(0).toUpperCase()}
      </span>
    );
  };

  return (
    <>
      {/* ---------------- MODAL OVERLAY ---------------- */}
      {logoutLoading && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3 className="text-lg font-semibold">Logging out...</h3>
            <p className="text-gray-600 mt-1">Please wait</p>
            <div className="spinner"></div>
          </div>
        </div>
      )}
      {/* ------------------------------------------------ */}

      <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-[65px] gap-2">

          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="h-12 w-auto object-contain" />
          </NavLink>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex lg:ml-6 lg:gap-x-6 items-center flex-shrink">
            {desktopLinks.map((link) => (
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

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">

            {/* Search */}
            <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 border border-gray-200 rounded-md focus-within:border-blue-500 transition-all">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={!isHome}
                className={`w-32 sm:w-48 text-sm bg-transparent outline-none ${
                  !isHome ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
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

            {/* Desktop: Login / Avatar + Logout */}
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition hidden lg:flex"
              >
                Login / Signup
              </NavLink>
            ) : (
              <div className="hidden lg:flex items-center gap-4 relative">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center cursor-pointer shadow-md hover:shadow-blue-400/50 hover:scale-105 transition-transform duration-200 relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {renderAvatar(user?.sub)}
                  {isHovered && user?.email && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-3 py-1 shadow-md whitespace-nowrap">
                      {user.email}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile download button */}
            <div className="block lg:hidden">
              <InstallPWAButton iconOnly />
            </div>

            {/* Mobile menu toggle */}
            <button
              id="toggleOpen"
              className="lg:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div className="absolute top-12 right-0 bg-white border border-gray-200 shadow-lg rounded-xl p-3 w-44 flex flex-col space-y-2 animate-fadeIn z-50">

                {isLoggedIn && (
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 mb-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                      {renderAvatar(user?.sub)}
                    </div>
                  </div>
                )}

                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-sm hover:bg-gray-100"
                  >
                    {link.name}
                  </NavLink>
                ))}

                {isLoggedIn && (
                  <NavLink
                    to="/premium"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-sm text-yellow-600 hover:bg-gray-100"
                  >
                    Premium Apps
                  </NavLink>
                )}

                {!isLoggedIn ? (
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="mt-1 px-3 py-2 text-center rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                  >
                    Login / Signup
                  </NavLink>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="mt-1 px-3 py-2 text-center rounded-md text-sm border hover:bg-gray-100"
                  >
                    Logout
                  </button>
                )}

                <div className="mt-2 text-center">
                  <InstallPWAButton />
                </div>
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
}
