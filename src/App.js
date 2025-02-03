import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
// import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import NavbarPage from "./components/Navbar";
import SidebarPage from "./components/Sidebar";
import HeroSection from "./components/HeroSection";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Profile />} />
        <Route path="/navbar" element={<NavbarPage />} />
        <Route path="/sidebar" element={<SidebarPage />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
