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
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import WorkInProgress from "./components/CommingSoon";
import Dashboard from "./pages/admin/MainLayout";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import { Navigate } from "react-router-dom";

const App = () => {
  const { userData, loading } = useContext(ShopContext);
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
          <Route path="/product/:id" element={<Product />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />

          {/* Admin Route */}
          <Route
            path="/admin/*"
            element={
              loading ? <div className="min-h-screen bg-slate-950" /> :
                userData?.role === 'admin' ? <Dashboard /> : <Navigate to="/" />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<WorkInProgress />} />
        </Routes>
      </div>

      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;
