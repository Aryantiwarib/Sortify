import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import ModuleCard from "./ModuleCard";

const ModulesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); // Collapse sidebar on mobile by default
      } else {
        setIsSidebarOpen(true); // Open sidebar on larger screens by default
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modules = [
    {
      title: "Common Module",
      description: "Streamline your everyday email tasks efficiently.",
    },
    {
      title: "HR Module",
      description: "Manage HR communications with smart email automation.",
    },
    {
      title: "Customer Service Module",
      description: "Enhance customer interactions with organized email responses.",
    },
    // Add more modules here
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen && !isMobile ? "ml-64" : "ml-16"}`}
      >
        {/* Mobile Toggle Button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 p-2 bg-blue-600 text-white rounded-md shadow-md z-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        )}

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={index}
              title={module.title}
              description={module.description}
              onClick={() => console.log(`Clicked ${module.title}`)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ModulesPage;