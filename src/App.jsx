import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Organization from "./pages/Organization";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ENTRY POINT */}
        <Route path="/" element={<Navigate to="/Home" replace />} />

        {/* FLOW */}
        <Route path="/organization" element={<Organization />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* DASHBOARD */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;