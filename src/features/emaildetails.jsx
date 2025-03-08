import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { gapi } from "gapi-script";

const EmailDetails = () => {
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
        const from = headers.find((header) => header.name === "From")?.value || "Unknown Sender";
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
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <Link to="/" className="inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        🔙 Back to Emails
      </Link>
      {emailContent ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{emailContent.subject}</h2>
            <div className="border-b border-gray-200 pb-4 mb-4 text-gray-600">
              <p><strong>From:</strong> {emailContent.from}</p>
              <p><strong>Date:</strong> {emailContent.date}</p>
            </div>
            {emailContent.attachments.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <strong className="block mb-2">Attachments:</strong>
                <ul className="list-disc pl-5">
                  {emailContent.attachments.map((attachment, index) => (
                    <li key={index}>
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-500 hover:underline">
                        {attachment.filename} ({attachment.mimeType})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: emailContent.body }} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default EmailDetails;


// git remote add origin git@github.com:Aryantiwarib/SemProjects.gitgit
// ls -al ~/.ssh
// Get-ChildItem -Path $env:USERPROFILE\.ssh
// ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
// Get-Content $env:USERPROFILE\.ssh\id_rsa.pub
// ssh -T git@github.com
// git remote -v
// git remote set-url origin git@github.com:Aryantiwarib/SemProjects.git

