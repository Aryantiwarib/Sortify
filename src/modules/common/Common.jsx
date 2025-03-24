import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import EmailList from "./EmailList";
import EmailDetails from "./EmailDetails";
import Sidebar from "./Sidebar";
import { gapi } from "gapi-script";
import { Mail, Loader } from "lucide-react";

const API_KEY = import.meta.env.VITE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

const formatSender = (fromString) => {
  const match = fromString.match(/^(.*?)\s*<.*?>(.*)$/);
  if (match) {
    return match[1].trim();
  }
  return fromString;
};

const Common = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const categories = {
    "Job Related": ["job", "career", "hire", "recruitment", "interview", "offer"],
    "Bank Related": ["bank", "transaction", "account", "loan", "credit", "debit"],
    "Promotions": ["promo", "offer", "discount", "sale", "deal"],
    "Social": ["linkedin", "facebook", "twitter", "instagram", "social"],
    "Education": ["course", "learning", "education", "certification", "webinar"],
  };

  const categorizeEmail = (subject, snippet) => {
    const lowerSubject = subject.toLowerCase();
    const lowerSnippet = snippet.toLowerCase();

    for (const [category, keywords] of Object.entries(categories)) {
      for (const keyword of keywords) {
        if (lowerSubject.includes(keyword) || lowerSnippet.includes(keyword)) {
          return category;
        }
      }
    }
    return "Uncategorized";
  };

  useEffect(() => {
    const loadGapi = async () => {
      try {
        await new Promise((resolve) => gapi.load("client:auth2", resolve));
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
        });

        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          setIsSignedIn(true);
          fetchEmails();
        }
      } catch (error) {
        console.error("Error initializing Google API:", error);
      }
    };

    loadGapi();
  }, []);

  const signIn = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      await authInstance.signIn();
      setIsSignedIn(true);
      fetchEmails();
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await gapi.client.gmail.users.messages.list({
        userId: "me",
        maxResults: 100,
      });

      if (response.result.messages) {
        const emailList = await Promise.all(
          response.result.messages.map(async (msg) => {
            const email = await gapi.client.gmail.users.messages.get({
              userId: "me",
              id: msg.id,
            });

            const subject =
              email.result.payload?.headers?.find((header) => header.name === "Subject")?.value || "No Subject";
            const fromRaw =
              email.result.payload?.headers?.find((header) => header.name === "From")?.value || "Unknown Sender";
            const from = formatSender(fromRaw);
            const snippet = email.result.snippet || "";

            const category = categorizeEmail(subject, snippet);

            return {
              id: msg.id,
              subject,
              from,
              date: new Date(parseInt(email.result.internalDate)).toLocaleString(),
              snippet,
              category,
            };
          })
        );

        setEmails(emailList);
        setFilteredEmails(emailList); // Initialize filtered emails with all emails
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      {/* Sidebar */}
      <Sidebar
        emails={emails}
        setFilteredEmails={setFilteredEmails}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-800 flex items-center"
          >
            <Mail className="w-6 h-6 mr-2 text-blue-600" />
            Gmail Clone
          </motion.h1>
          {!isSignedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
              onClick={signIn}
            >
              Sign in with Google
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center text-green-600 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Signed in
            </motion.div>
          )}
        </header>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50"
          >
            <div className="text-center">
              <Loader className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-800">Loading emails...</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <EmailList
                  emails={filteredEmails.length > 0 ? filteredEmails : emails}
                  isSignedIn={isSignedIn}
                  loading={loading}
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              }
            />
            <Route
              path="/email/:id"
              element={
                <EmailDetails
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Common;