import React from "react";
import AppCard from "./AppCard";

const AppSection = ({ title, apps, color }) => {
  return (
    <section className="max-w-screen-xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {apps.map(app => (
          <AppCard key={app.name} {...app} color={color} />
        ))}
      </div>
    </section>
  );
};

export default AppSection;
