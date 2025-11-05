import React, { useState } from "react";
import { NavbarComponent } from "../components/NavbarComponent";
import { premiumLinks } from "../data/premiumAppLinks";
import { NoticeHeadline } from "../components/NoticeHeadline";

export default function PremiumPage() {
  const [search, setSearch] = useState("");
  const isLoggedIn = true; // Premium visible only when logged in

  const filteredApps = premiumLinks.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.info.toLowerCase().includes(search.toLowerCase())
  );

  const displayApps = search ? filteredApps : premiumLinks;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <NavbarComponent search={search} setSearch={setSearch} />

      {/* Optional Notice */}
      {!isLoggedIn && (
        <NoticeHeadline text="🔐 Log in to access premium apps" />
      )}

      {/* Header */}
      <section className="text-center mt-10 mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Premium Apps
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Exclusive AI-powered and high-quality tools to boost your workflow.
        </p>
      </section>

      {/* Main Content Container */}
      <main className="flex-1 w-full flex justify-center px-4 sm:px-8 pb-16">
        <div className="w-full max-w-6xl">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {displayApps.map((app, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={app.img}
                        alt={app.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {app.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {app.info}
                  </p>
                </div>

                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-full transition"
                >
                  Explore
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
