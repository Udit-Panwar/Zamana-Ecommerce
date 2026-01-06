import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import About from "./pages/About";
import WorkInProgress from "./components/CommingSoon";
import Dashboard from "./pages/admin/MainLayout";

const App = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div>
      {/* Hide navbar/footer on admin */}
      {!isAdminPath && <Navbar />}

      <div className="min-h-[70vh]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          {/* Admin Route */}
          <Route path="/admin/*" element={<Dashboard />} />

          {/* Fallback */}
          <Route path="*" element={<WorkInProgress />} />
        </Routes>
      </div>

      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;
