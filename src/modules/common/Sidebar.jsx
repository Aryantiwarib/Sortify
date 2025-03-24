import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Settings, User, LogOut } from "lucide-react";

const Sidebar = ({ emails, setFilteredEmails, isSidebarOpen, toggleSidebar }) => {
  const categories = {
    "Job Related": ["job", "career", "hire", "recruitment", "interview", "offer"],
    "Bank Related": ["bank", "transaction", "account", "loan", "credit", "debit"],
    "Promotions": ["promo", "offer", "discount", "sale", "deal"],
    "Social": ["linkedin", "facebook", "twitter", "instagram", "social"],
    "Education": ["course", "learning", "education", "certification", "webinar"],
  };

  const handleCategoryClick = (category) => {
    const filtered = emails.filter((email) => email.category === category);
    setFilteredEmails(filtered);
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-64 bg-gray-800 text-white rounded-lg shadow-md p-6 ${isSidebarOpen ? "block" : "hidden"}`}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Mail className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold">Mail</h2>
        </div>
        <nav className="space-y-2">
          <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
            <User className="w-4 h-4" />
            <span>Inbox</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <Link to="/logout" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </nav>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400">Categories</h3>
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;