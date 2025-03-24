import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoginModal from "../Login/Login"; // Import the LoginModal component

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for login modal
  const authStatus = useSelector((state) => state.auth.status); // Access auth status from Redux
  const navigate = useNavigate(); // Initialize useNavigate

  const handleServiceClick = (serviceName) => {
    if (!authStatus) {
      setIsLoginModalOpen(true); // Open login modal if not authenticated
      return;
    }

    // Navigate to the appropriate route based on the service name
    if (serviceName === "Common Module") {
      navigate("/common");
    } else if (serviceName === "HR Module") {
      navigate("/hrmodule");
    } else if (serviceName === "Customer Service Module") {
      navigate("/customercare");
    } else if (serviceName === "modules") {
      navigate("/modules");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 font-sans">
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-purple-600 relative overflow-hidden"
      >
        {/* Subtle Particle Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-[url('/images/particle-pattern.svg')] bg-cover opacity-20"
        ></motion.div>

        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-6xl font-bold text-center mb-6 z-10"
        >
          AI Email Organiser
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-xl text-center mb-8 z-10"
        >
          Organize, prioritize, and manage your emails effortlessly with AI.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition duration-300 z-10"
          onClick={() => handleServiceClick("modules")} // Pass "modules" as the service name
        >
          Try It Now
        </motion.button>

        {/* Email Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-8xl z-10"
        >
          📨
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="mt-16 max-w-6xl w-full px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10 text-gray-800"
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white shadow-2xl rounded-xl p-8 text-center transition duration-300 hover:shadow-3xl"
            >
              <div className="flex justify-center mb-6">
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="text-6xl"
                >
                  {feature.icon}
                </motion.span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-16 max-w-6xl w-full px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10 text-gray-800"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white shadow-2xl rounded-xl p-8 text-center transition duration-300 hover:shadow-3xl"
            >
              <div className="flex justify-center mb-6">
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="text-6xl"
                >
                  {service.icon}
                </motion.span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-600 transition duration-300"
                onClick={() => handleServiceClick(service.title)}
              >
                Use {service.title}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16 max-w-6xl w-full px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10 text-gray-800"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white shadow-2xl rounded-xl p-8 text-center transition duration-300 hover:shadow-3xl"
            >
              <p className="text-gray-600 italic mb-6">
                "{testimonial.quote}"
              </p>
              <p className="text-gray-800 font-bold">{testimonial.name}</p>
              <p className="text-gray-500">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-16 w-full bg-gradient-to-r from-purple-600 to-gray-600 py-20 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-[url('/images/particle-pattern.svg')] bg-cover opacity-10"
        ></motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Organize Your Emails?
          </h2>
          <p className="text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their emails
            effortlessly with our AI-powered tools. Get started today and take
            control of your inbox!
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
            onClick={() => handleServiceClick("modules")} // Pass "modules" as the service name
          >
            Get Started Now
          </motion.button>
        </motion.div>

        {/* Floating Icons for Visual Appeal */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 text-6xl text-white opacity-20"
        >
          📧
        </motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-10 text-6xl text-white opacity-20"
        >
          📨
        </motion.div>
      </div>
    </div>
  );
};

const services = [
  {
    title: "Common Module",
    description: "Streamline your everyday email tasks efficiently.",
    icon: "📧",
  },
  {
    title: "HR Module",
    description: "Manage HR communications with smart email automation.",
    icon: "👥",
  },
  {
    title: "Customer Service Module",
    description: "Enhance customer interactions with organized email responses.",
    icon: "🤝",
  },
];

const features = [
  {
    title: "Smart Sorting",
    description: "Automatically categorize emails into folders.",
    icon: "🗂️",
  },
  {
    title: "Quick Search",
    description: "Find any email in seconds with advanced search filters.",
    icon: "🔍",
  },
  {
    title: "Email Analytics",
    description: "Track email performance and engagement metrics.",
    icon: "📊",
  },
];

const testimonials = [
  {
    quote: "This tool has completely transformed how I manage my emails!",
    name: "John Doe",
    role: "Marketing Manager",
  },
  {
    quote: "The AI email organizer is a game-changer for our HR team.",
    name: "Jane Smith",
    role: "HR Director",
  },
];

export default Home;