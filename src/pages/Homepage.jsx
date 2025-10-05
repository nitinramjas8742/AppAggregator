import React, { useState, useEffect } from "react";
import { NavbarComponent } from "../components/NavbarComponent";
import Sidebar from "../components/Sidebar";
import AppSection from "../components/AppSection";
import {NoticeHeadline} from "../components/NoticeHeadline";
import {llmLinks,ecommerceLinks, rideHailingPlatforms,movieBookingLinks,foodLinks ,bookingLinks,
  socialMediaLinks,datingLinks,jobPortalsLinks,governmentPrepLinks,educationLinks,digitalNewsLinks,
  ottLinks,paymentLinks} from "../data/appLinks";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("all");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const isLoggedIn = false; // mock auth
  const premiumApps = [];


 
  const sections = {
    llm: { title: "Popular LLM Apps", color: "border-blue-100", data: llmLinks },
    ecommerce: { title: "E-commerce Apps", color: "border-yellow-100", data: ecommerceLinks },
    ridebooking: { title: "Ride-Booking Platforms", color: "border-gray-100", data: rideHailingPlatforms },
    movieBooking : { title: "Movie Booking Apps", color: "border-red-100", data: movieBookingLinks },
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

  // 🔍 Highlight section based on sidebar search
  const matchedSection = Object.keys(sections).find(key =>
    sections[key].title.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

useEffect(() => {
  if (sidebarSearch.trim() === "") {
    // ✅ if sidebar search is cleared, go back to "all"
    setActiveSection("all");
  } else if (matchedSection) {
    setActiveSection(matchedSection);
  }
}, [sidebarSearch]);

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

        {/* Notice Headline for non-logged-in users */}
        {!isLoggedIn && (
          <NoticeHeadline text="🚨 To unlock premium apps, just log in! 🔑✨"/>
        )}

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
    </div>
  );
};

export default Homepage;

