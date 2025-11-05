import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent";
import Sidebar from "../components/Sidebar";
import AppSection from "../components/AppSection";
import { NoticeHeadline } from "../components/NoticeHeadline";
import {
  llmLinks, ecommerceLinks, rideHailingPlatforms, movieBookingLinks, foodLinks, bookingLinks,
  socialMediaLinks, datingLinks, jobPortalsLinks, governmentPrepLinks, educationLinks,
  digitalNewsLinks, ottLinks, paymentLinks
} from "../data/appLinks";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("all");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showScrollButton, setShowScrollButton] = useState(false);

  const navigate = useNavigate();

  const sections = {
    llm: { title: "AI Apps", color: "border-blue-100", data: llmLinks },
    ecommerce: { title: "E-commerce Apps", color: "border-yellow-100", data: ecommerceLinks },
    ridebooking: { title: "Ride-Booking Platforms", color: "border-gray-100", data: rideHailingPlatforms },
    movieBooking: { title: "Movie Booking Apps", color: "border-red-100", data: movieBookingLinks },
    foodDelivery: { title: "Food Delivery Apps", color: "border-purple-100", data: foodLinks },
    bookings: { title: "Booking Apps", color: "border-pink-100", data: bookingLinks },
    socialMediaLinks: { title: "Social Media Apps", color: "border-indigo-100", data: socialMediaLinks },
    dating: { title: "Dating Apps", color: "border-teal-100", data: datingLinks },
    jobPortals: { title: "Job Portals", color: "border-orange-100", data: jobPortalsLinks },
    governmentPrep: { title: "Government Exam Prep", color: "border-cyan-100", data: governmentPrepLinks },
    education: { title: "Educational Platforms", color: "border-lime-100", data: educationLinks },
    digitalNews: { title: "Digital News Platforms", color: "border-rose-100", data: digitalNewsLinks },
    ott: { title: "OTT Platforms", color: "border-violet-100", data: ottLinks },
    payment: { title: "Payment Apps", color: "border-green-100", data: paymentLinks },
  };

  // ✅ Sync login status automatically on login/logout
  useEffect(() => {
    const updateLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // listen for cross-tab changes
    window.addEventListener("storage", updateLoginState);
    // listen for same-tab custom event
    window.addEventListener("loginStatusChanged", updateLoginState);

    return () => {
      window.removeEventListener("storage", updateLoginState);
      window.removeEventListener("loginStatusChanged", updateLoginState);
    };
  }, []);

  // 🔍 Sidebar filtering
  const matchedSection = Object.keys(sections).find(key =>
    sections[key].title.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  useEffect(() => {
    if (sidebarSearch.trim() === "") {
      setActiveSection("all");
    } else if (matchedSection) {
      setActiveSection(matchedSection);
    }
  }, [sidebarSearch, matchedSection]);

  // 🔍 Global search across all apps
  const allApps = Object.keys(sections).flatMap(key =>
    sections[key].data.map(app => ({ ...app, section: key }))
  );

  const filteredApps = allApps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.info.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarSearch={sidebarSearch}
        setSidebarSearch={setSidebarSearch}
      />

      {/* Main content */}
      <main className="flex-1">
        <NavbarComponent search={search} setSearch={setSearch} />

        {/* ✅ Dynamic Notice Headline */}
        <NoticeHeadline
          text={
            isLoggedIn
              ? "🌟 Enjoy Premium Apps!"
              : "🚨 To unlock premium Apps, just log in! 🔑✨"
          }
        />

        {/* App Sections */}
        {search ? (
          <AppSection title="Search Results" apps={filteredApps} color="border-blue-100" />
        ) : activeSection === "all" ? (
          Object.keys(sections).map((key) => (
            <AppSection
              key={key}
              title={sections[key].title}
              apps={sections[key].data}
              color={sections[key].color}
            />
          ))
        ) : (
          <AppSection
            title={sections[activeSection].title}
            apps={sections[activeSection].data}
            color={sections[activeSection].color}
          />
        )}
      </main>

      {/* Floating search button (mobile only) */}
      <button
        onClick={() => navigate("/search")}
        className="fixed bottom-6 right-6 sm:hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full p-4 shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 focus:outline-none"
        aria-label="Open search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35m1.6-4.4a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Homepage;
