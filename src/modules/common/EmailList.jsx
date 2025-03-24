import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Mail, User } from "lucide-react";

const formatSender = (fromString) => {
  const match = fromString.match(/^(.*?)\s*<.*?>(.*)$/);
  if (match) {
    return match[1].trim();
  }
  return fromString;
};

const EmailList = ({ emails, isSignedIn, loading }) => {
  if (!isSignedIn) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Mail className="w-5 h-5 mr-2 text-blue-600" />
        All Emails
      </h3>
      {loading ? (
        <div className="p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="min-w-full divide-y divide-gray-200"
          >
            <div className="bg-gray-50">
              <div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm font-medium text-gray-500">
                <div className="col-span-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  From
                </div>
                <div className="col-span-7 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Subject
                </div>
                <div className="col-span-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Date
                </div>
              </div>
            </div>
            <div className="bg-white divide-y divide-gray-200">
              {emails.map((email) => (
                <motion.div
                  key={email.id}
                  variants={item}
                  className="hover:bg-blue-50 transition-colors duration-150"
                  whileHover={{
                    backgroundColor: "rgba(236, 246, 255, 0.8)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
                    <div className="col-span-3 truncate font-medium text-gray-700">
                      {formatSender(email.from)}
                    </div>
                    <div className="col-span-7">
                      <Link to={`/email/${email.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        {email.subject}
                      </Link>
                      <p className="text-gray-500 truncate text-xs mt-1">{email.snippet}</p>
                    </div>
                    <div className="col-span-2 text-xs text-gray-500">
                      {email.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EmailList;