import React from "react";

const Sidebar = ({ sections, activeSection, setActiveSection, sidebarSearch, setSidebarSearch }) => {
  return (
    <aside className="w-48 bg-gray-100 border-r p-4">
      <h2 className="font-bold mb-2">Sections</h2>
      <input
        type="text"
        placeholder="Search section..."
        className="w-full p-2 mb-4 rounded border"
        value={sidebarSearch}
        onChange={(e) => setSidebarSearch(e.target.value)}
      />
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left p-2 rounded ${activeSection === "all" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
            onClick={() => { setActiveSection("all"); setSidebarSearch(""); }}
          >
            All Apps
          </button>
        </li>
        {Object.keys(sections).map(key => (
          <li key={key}>
            <button
              className={`w-full text-left p-2 rounded ${activeSection === key ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
              onClick={() => { setActiveSection(key); setSidebarSearch(""); }}
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
