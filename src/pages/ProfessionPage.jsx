import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { NavbarComponent } from "../components/NavbarComponent";
import AppSection from "../components/AppSection";
import { professionSections } from "../data/professionLinks";

const ProfessionPage = () => {
  const [navbarSearch, setNavbarSearch] = useState("");
  const [activeProfession, setActiveProfession] = useState(null);
  const [professionSearch, setProfessionSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProfessions = useMemo(() => {
    const query = professionSearch.trim().toLowerCase();
    if (!query) return Object.keys(professionSections);
    return Object.keys(professionSections).filter((key) =>
      professionSections[key].title.toLowerCase().includes(query)
    );
  }, [professionSearch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent search={navbarSearch} setSearch={setNavbarSearch} />

      <section className="max-w-screen-xl mx-auto pt-10 px-4">
        {!activeProfession && (
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search professions..."
              value={professionSearch}
              onChange={(e) => setProfessionSearch(e.target.value)}
              className="w-full sm:max-w-md px-4 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </section>

      {!activeProfession ? (
        <section className="max-w-screen-xl mx-auto py-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessions.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveProfession(key)}
                className={`text-left p-6 bg-white rounded-xl shadow hover:shadow-lg transition border ${professionSections[key].color} flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {professionSections[key].title}
                  </h3>
                  <span className="text-sm text-blue-600">View apps</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Top apps used by {professionSections[key].title.toLowerCase()}s.
                </p>
              </button>
            ))}
            {filteredProfessions.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">
                No professions found.
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center flex-1">
              {professionSections[activeProfession].title}
            </h2>
            <button
              type="button"
              onClick={() => setActiveProfession(null)}
              className="text-blue-600 hover:text-blue-700 p-2"
              aria-label="Back to professions"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <AppSection
            title="Top Apps"
            apps={professionSections[activeProfession].data}
            color={professionSections[activeProfession].color}
          />
        </div>
      )}
    </div>
  );
};

export default ProfessionPage;
