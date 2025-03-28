import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Fixed incorrect import
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import "./index.css"; // Import global styles

function App() {
  return (
    <Router>
      {/* Navbar included outside Routes to appear on all pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Corrected path */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} /> {/* Handles 404 errors */}
      </Routes>
    </Router>
  );
}

export default App;
