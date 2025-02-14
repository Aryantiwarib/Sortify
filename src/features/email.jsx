import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

const GmailAuth = () => {
  const [emails, setEmails] = useState([]);

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
      } catch (error) {
        console.error("Error initializing Google API:", error);
      }
    };

    loadGapi();
  }, []);

  const signIn = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance) {
        await authInstance.signIn();
        fetchEmails();
      } else {
        console.error("Google Auth instance not found.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await gapi.client.gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
      });

      if (response.result.messages) {
        const emailList = await Promise.all(
          response.result.messages.map(async (msg) => {
            const email = await gapi.client.gmail.users.messages.get({
              userId: "me",
              id: msg.id,
            });
            return { id: msg.id, subject: email.result.payload?.headers?.find(header => header.name === "Subject")?.value || "No Subject" };
          })
        );
        setEmails(emailList);
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>📧 Gmail API Integration</h2>
      <button style={styles.button} onClick={signIn}>Sign in with Google</button>

      <h3>📜 Fetched Emails</h3>
      <ul style={styles.emailList}>
        {emails.map((email) => (
          <li key={email.id} style={styles.emailItem}>
            <Link to={`/email/${email.id}`} style={styles.link}>
              <strong>{email.subject}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer", background: "#007bff", color: "white", border: "none", borderRadius: "5px" },
  emailList: { listStyle: "none", padding: 0 },
  emailItem: { margin: "10px 0", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", background: "#f9f9f9" },
  link: { textDecoration: "none", color: "#007bff", fontSize: "18px" },
};

export default GmailAuth;
