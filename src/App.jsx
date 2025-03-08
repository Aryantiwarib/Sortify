import React from "react";
import Home from "./components/Home/home";
import Header from "./components/Header/header";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Fotter/fotter";

function App() {
  return (
    <Router>
      <Header />
      <Home />
      <Footer />
    </Router>

  );
}

export default App;
