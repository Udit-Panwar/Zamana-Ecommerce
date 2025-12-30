import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import About from "./pages/About"
import WorkInProgress from "./components/CommingSoon";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {/* Hide navbar for owner/admin pages */}
      {!isOwnerPath && <Navbar />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          Product Details Page
          <Route path="/product/:id" element={<Product />} />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Checkout */}
          <Route path="/place-order" element={<PlaceOrder />} />

          {/* Order History */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/working" element={<WorkInProgress />} />
        </Routes>
      </div>

      {/* Hide footer on owner panel */}
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
