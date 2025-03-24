import React from "react";
import { motion } from "framer-motion";
import { Mail, Settings, User, LogOut } from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const modules = [
    { name: "Common Module", icon: <Mail className="w-5 h-5" /> },
    { name: "HR Module", icon: <User className="w-5 h-5" /> },
    { name: "Customer Service Module", icon: <Settings className="w-5 h-5" /> },
    // Add more modules here
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed h-screen bg-gray-800 text-white shadow-lg ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 z-50`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {isSidebarOpen && <h2 className="text-xl font-bold">Modules</h2>}
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-300"
          >
            {isSidebarOpen ? (
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
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            ) : (
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
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            )}
          </button>
        </div>
        <nav className="space-y-4">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
            >
              {module.icon}
              {isSidebarOpen && <span>{module.name}</span>}
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;


//npm install @mui/material @emotion/react @emotion/styled