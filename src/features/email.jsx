import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

const GmailClone = () => {
  const [emails, setEmails] = useState([]);
  const [categorizedEmails, setCategorizedEmails] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

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
            const from =
              email.result.payload?.headers?.find((header) => header.name === "From")?.value || "Unknown Sender";

            return {
              id: msg.id,
              subject,
              from,
              date: new Date(parseInt(email.result.internalDate)).toLocaleString(),
              snippet: email.result.snippet || "",
            };
          })
        );

        setEmails(emailList);
        categorizeEmails(emailList);
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
    setLoading(false);
  };

  const categorizeEmails = (emailList) => {
    const categories = {
      "📂 Job-Related": [],
      "🏦 Banking & Finance": [],
      "📱 Social Media": [],
      "📢 Promotions & Offers": [],
      "👤 Personal": [],
    };

    emailList.forEach((email) => {
      const lowerSubject = email.subject.toLowerCase();
      const lowerFrom = email.from.toLowerCase();

      if (
        lowerSubject.includes("job") ||
        lowerSubject.includes("hiring") ||
        lowerFrom.includes("linkedin") ||
        lowerFrom.includes("indeed")
      ) {
        categories["📂 Job-Related"].push(email);
      } else if (
        lowerSubject.includes("bank") ||
        lowerSubject.includes("transaction") ||
        lowerSubject.includes("payment") ||
        lowerFrom.includes("paypal") ||
        lowerFrom.includes("bank")
      ) {
        categories["🏦 Banking & Finance"].push(email);
      } else if (
        lowerFrom.includes("facebook") ||
        lowerFrom.includes("twitter") ||
        lowerFrom.includes("instagram") ||
        lowerFrom.includes("snapchat")
      ) {
        categories["📱 Social Media"].push(email);
      } else if (
        lowerSubject.includes("offer") ||
        lowerSubject.includes("discount") ||
        lowerSubject.includes("deal") ||
        lowerFrom.includes("amazon") ||
        lowerFrom.includes("flipkart")
      ) {
        categories["📢 Promotions & Offers"].push(email);
      } else {
        categories["👤 Personal"].push(email);
      }
    });

    setCategorizedEmails(categories);
  };

  const filteredEmails = selectedCategory === "All" ? emails : categorizedEmails[selectedCategory] || [];

  return (
    <div style={styles.container}>
      <h2>📧 Gmail Clone</h2>
      {!isSignedIn ? (
        <button style={styles.button} onClick={signIn}>Sign in with Google</button>
      ) : (
        <p style={styles.signedInText}>✅ Signed in</p>
      )}

      {loading && <p>Loading emails...</p>}

      <div style={styles.emailContainer}>
        <div style={styles.sidebar}>
          <h3>📂 Categories</h3>
          <ul>
            <li style={selectedCategory === "All" ? styles.activeCategory : styles.category} onClick={() => setSelectedCategory("All")}>📥 All Emails ({emails.length})</li>
            {Object.keys(categorizedEmails).map((category) => (
              <li
                key={category}
                style={selectedCategory === category ? styles.activeCategory : styles.category}
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({categorizedEmails[category].length})
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.emailListContainer}>
          <h3>{selectedCategory} Emails</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>📩 From</th>
                <th>📜 Subject</th>
                <th>🕒 Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmails.map((email) => (
                <tr key={email.id} style={styles.emailItem}>
                  <td>{email.from}</td>
                  <td>
                    <Link to={`/email/${email.id}`} style={styles.link}>
                      {email.subject}
                    </Link>
                  </td>
                  <td>{email.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer", background: "#007bff", color: "white", border: "none", borderRadius: "5px" },
  signedInText: { color: "green", fontWeight: "bold" },
  emailContainer: { display: "flex", marginTop: "20px" },
  sidebar: { width: "250px", background: "#f1f1f1", padding: "10px", textAlign: "left" },
  category: { cursor: "pointer", padding: "10px", borderBottom: "1px solid #ddd" },
  activeCategory: { cursor: "pointer", padding: "10px", fontWeight: "bold", color: "blue", borderBottom: "2px solid blue" },
  emailListContainer: { flex: 1, marginLeft: "20px" },
  table: { width: "100%", borderCollapse: "collapse" },
  emailItem: { borderBottom: "1px solid #ddd", padding: "10px" },
  link: { textDecoration: "none", color: "#007bff", fontWeight: "bold" },
};

export default GmailClone;
