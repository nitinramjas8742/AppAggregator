import React from "react";

function AppCard({ name, info, url, img, color }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-lg transition border ${color} flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      <div>
        <img
          src={img}
          alt={name}
          className="h-12 w-12 sm:h-16 sm:w-16 object-contain mb-3 sm:mb-4 mx-auto"
        />
        <h3 className="text-sm sm:text-xl font-semibold text-center">
          {name}
        </h3>
        <p className="hidden sm:block text-gray-600 mt-2 mb-4 text-center">
          {info}
        </p>
      </div>
      <span className="hidden sm:inline-block mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition text-center">
        Visit
      </span>
    </a>
  );
}

export default AppCard;
