  import React, { useEffect, useState } from "react";
  import { useParams, Link } from "react-router-dom";
  import { gapi } from "gapi-script";
  import { ArrowLeft, Paperclip, Menu } from "lucide-react";
  import { motion } from "framer-motion";

  const formatSender = (fromString) => {
    const match = fromString.match(/^(.*?)\s*<.*?>(.*)$/);
    if (match) {
      return match[1].trim();
    }
    return fromString;
  };

  const EmailDetails = ({ isSidebarOpen, toggleSidebar }) => {
    const { id } = useParams();
    const [emailContent, setEmailContent] = useState(null);

    useEffect(() => {
      const fetchEmailDetails = async () => {
        try {
          const email = await gapi.client.gmail.users.messages.get({
            userId: "me",
            id: id,
          });

          const headers = email.result.payload.headers;
          const subject = headers.find((header) => header.name === "Subject")?.value || "No Subject";
          const fromRaw = headers.find((header) => header.name === "From")?.value || "Unknown Sender";
          const from = formatSender(fromRaw);
          const date = headers.find((header) => header.name === "Date")?.value || "Unknown Date";

          let body = "No Content";
          let attachments = [];

          if (email.result.payload.parts) {
            email.result.payload.parts.forEach((part) => {
              if (part.mimeType === "text/html" || part.mimeType === "text/plain") {
                body = atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
              } else if (part.filename) {
                attachments.push({
                  filename: part.filename,
                  mimeType: part.mimeType,
                  attachmentId: part.body.attachmentId,
                });
              }
            });
          }

          setEmailContent({ subject, from, date, body, attachments });
        } catch (error) {
          console.error("Error fetching email details:", error);
        }
      };

      fetchEmailDetails();
    }, [id]);

    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar is controlled by the parent component (Common.js) */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
          {/* Sidebar content is rendered by the parent component */}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-8"
        >
          <div className="flex items-center mb-6">
            <button
              onClick={toggleSidebar}
              className="p-2 mr-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              to="/common"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Emails
            </Link>
          </div>
          {emailContent ? (
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">{emailContent.subject}</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-center"><span className="font-semibold w-16">From:</span> {emailContent.from}</p>
                <p className="flex items-center"><span className="font-semibold w-16">Date:</span> {emailContent.date}</p>
              </div>
              {emailContent.attachments.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center font-semibold text-gray-700 mb-2">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attachments:
                  </div>
                  <ul className="space-y-2">
                    {emailContent.attachments.map((attachment, index) => (
                      <motion.li
                        key={index}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
                          <span className="truncate">{attachment.filename}</span>
                          <span className="text-xs text-gray-500 ml-2">({attachment.mimeType})</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="prose prose-sm max-w-none bg-white p-4 rounded-md shadow-sm" dangerouslySetInnerHTML={{ __html: emailContent.body }} />
            </motion.div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  };

  export default EmailDetails;