import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GmailAuth from "./features/email";
import EmailDetails from "./features/emaildetails";
// npm install react-router-dom

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GmailAuth />} />
        <Route path="/email/:id" element={<EmailDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
