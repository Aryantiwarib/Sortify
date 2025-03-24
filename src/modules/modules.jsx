import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModulesPage from "./ModulesPage";

const modules = () => {
  return (
      <Routes>
        <Route path="/" element={<ModulesPage />} />
      </Routes>
  );
};

export default modules;