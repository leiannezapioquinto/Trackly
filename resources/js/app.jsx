import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Settings from "./pages/Settings";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
         <Route path="/statistics" element={<Statistics />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
