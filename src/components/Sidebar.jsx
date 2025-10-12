import React from "react";

const Sidebar = ({ sections, activeSection, setActiveSection, sidebarSearch, setSidebarSearch }) => {
  return (
    // Hidden on small screens (<640px), visible on larger screens
    <aside className="w-56 bg-gray-100 border-r p-4 h-screen sticky top-0 overflow-y-auto hidden sm:block">
      <h2 className="font-bold mb-3 text-lg">Sections</h2>
      <input
        type="text"
        placeholder="Search section..."
        className="w-full p-2 mb-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={sidebarSearch}
        onChange={(e) => setSidebarSearch(e.target.value)}
      />
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left p-2 rounded transition ${
              activeSection === "all"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveSection("all");
              setSidebarSearch("");
            }}
          >
            All Apps
          </button>
        </li>
        {Object.keys(sections).map((key) => (
          <li key={key}>
            <button
              className={`w-full text-left p-2 rounded transition ${
                activeSection === key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveSection(key);
                setSidebarSearch("");
              }}
            >
              {sections[key].title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
