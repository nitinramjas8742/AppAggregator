import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Layers, Search, Globe } from "lucide-react";
import logo from "../assets/link-looop-connectDiscoverFlow.png";
import { NavbarComponent } from "../components/NavbarComponent";

export default function AboutPage() {
  const [search, setSearch] = React.useState("");

  // Scroll to top when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponent search={search} setSearch={setSearch} />

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 text-center"
        >
          About <span className="text-blue-600">LinkLooop</span>
        </motion.h1>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto"
        >
          LinkLooop is a unified platform that brings together tools, apps, and
          resources from different domains into a single space. Our mission is
          to simplify discovery, save your time, and make it easier to connect
          with what matters.
        </motion.p>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            {
              icon: <Search className="w-8 h-8 text-blue-600" />,
              title: "Smart Search",
              desc: "Find apps and resources instantly with our optimized search experience.",
            },
            {
              icon: <Layers className="w-8 h-8 text-blue-600" />,
              title: "Organized in One Place",
              desc: "No more jumping across websites — everything you need is aggregated here.",
            },
            {
              icon: <Users className="w-8 h-8 text-blue-600" />,
              title: "Community Driven",
              desc: "Contributions from users help us stay up-to-date and relevant.",
            },
            {
              icon: <Globe className="w-8 h-8 text-blue-600" />,
              title: "Global Access",
              desc: "Access resources anytime, anywhere with a seamless experience.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx, duration: 0.6 }}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-3">
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800">Our vision is simple —</h2>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            To create a world where finding the right app or resource is no
            longer a hassle, but a joy.
          </p>
        </motion.div>

        {/* Chaos signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 italic">— Crafted with intent, signed by</p>
          <h3 className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
            Chaos
          </h3>
        </motion.div>
      </div>

      {/* Big Logo at bottom */}
      <div className="flex justify-center mb-6">
        <img src={logo} alt="Chaos Logo" className="w-2/3 max-w-4xl h-auto opacity-90" />
      </div>
    </div>
  );
}
