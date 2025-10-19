import React from "react";

function AppCard({ name, info, url, img, color }) {
  return (
    <div className={`p-6 bg-white rounded-lg shadow hover:shadow-lg transition border ${color} flex flex-col justify-between`}>
      <div>
        <img src={img} alt={name} className="h-16 w-16 object-contain mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-2 text-center">{name}</h3>
        <p className="text-gray-600 mb-4 text-center">{info}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition text-center"
      >
        Visit
      </a>
    </div>
  );
}

export default AppCard;