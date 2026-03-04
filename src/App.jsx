import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Organization from "./pages/Organization";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {

  const RequireOrganization = ({ children }) => {
    const orgCreated = localStorage.getItem("organizationCreated")

    if (orgCreated !== "true") {
      return <Navigate to="/organization" replace />
    }

    return children
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* ENTRY */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* PUBLIC PAGE */}
        <Route path="/home" element={<Home />} />

        {/* ORGANIZATION SETUP */}
        <Route path="/organization" element={<Organization />} />

        {/* LOGIN (Protected) */}
        <Route 
          path="/login" 
          element={
            <RequireOrganization>
              <Login />
            </RequireOrganization>
          } 
        />

        {/* REGISTER (Protected) */}
        <Route 
          path="/register" 
          element={
            <RequireOrganization>
              <Register />
            </RequireOrganization>
          } 
        />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;