import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSection from "../components/AppSection";
import {
  llmLinks, ecommerceLinks, rideHailingPlatforms, movieBookingLinks, foodLinks, bookingLinks,
  socialMediaLinks, datingLinks, jobPortalsLinks, governmentPrepLinks, educationLinks,
  digitalNewsLinks, ottLinks, paymentLinks
} from "../data/appLinks";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // NEW
  const navigate = useNavigate();

  const sections = {
    llm: { title: "Popular LLM Apps", data: llmLinks },
    ecommerce: { title: "E-commerce Apps", data: ecommerceLinks },
    ridebooking: { title: "Ride-Booking Platforms", data: rideHailingPlatforms },
    movieBooking: { title: "Movie Booking Apps", data: movieBookingLinks },
    foodDelivery: { title: "Food Delivery Apps", data: foodLinks },
    bookings: { title: "Booking Apps", data: bookingLinks },
    socialMediaLinks: { title: "Social Media Apps", data: socialMediaLinks },
    dating: { title: "Dating Apps", data: datingLinks },
    jobPortals: { title: "Job Portals", data: jobPortalsLinks },
    governmentPrep: { title: "Government Exam Prep", data: governmentPrepLinks },
    education: { title: "Educational Platforms", data: educationLinks },
    digitalNews: { title: "Digital News Platforms", data: digitalNewsLinks },
    ott: { title: "OTT Platforms", data: ottLinks },
    payment: { title: "Payment Apps", data: paymentLinks },
  };

  // Flatten all apps for search
  const allApps = Object.keys(sections).flatMap(key =>
    sections[key].data.map(app => ({ ...app, section: key }))
  );

  const filteredApps = allApps.filter(app =>
    app.name.toLowerCase().includes(query.toLowerCase()) ||
    app.info.toLowerCase().includes(query.toLowerCase())
  );

  // Handle category click
  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setQuery(""); // reset search when clicking category
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar with back button */}
      <div className="flex items-center gap-3 p-4 bg-white shadow sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <input
  type="text"
  placeholder="Search apps..."
  value={query}
  onChange={(e) => {
    setQuery(e.target.value);
    setSelectedCategory(null); // reset category on typing
  }}
  onFocus={() => {
    setQuery("");              // reset search text
    setSelectedCategory(null);  // reset category selection
  }}
  className="flex-grow border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
  autoFocus
/>

      </div>

      {/* Categories Grid */}
      {!query && !selectedCategory && (
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.keys(sections).map((key) => (
            <div
              key={key}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center shadow hover:shadow-lg transition"
              onClick={() => handleCategoryClick(key)}
            >
              <span className="text-center text-sm font-medium">{sections[key].title}</span>
            </div>
          ))}
        </div>
      )}

      {/* App results */}
      <div className="p-4">
        {query && filteredApps.length > 0 && (
          <AppSection title={`Search Results for "${query}"`} apps={filteredApps} color="border-blue-100" />
        )}

        {selectedCategory && (
          <AppSection
            title={sections[selectedCategory].title}
            apps={sections[selectedCategory].data}
            color="border-blue-100"
          />
        )}

        {query && filteredApps.length === 0 && (
          <div className="text-gray-500">No apps found for "{query}"</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
