import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

export default function Collection() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cart, removeFromCart } = useContext(ShopContext);

  const isInCart = (product) =>
    cart.some((item) => item._id === product._id);

  // 🔥 FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full py-16 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto">

        {/* ✅ HEADING (UNCHANGED) */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-400 via-rose-500 to-pink-400 bg-clip-text text-transparent mb-4">
            Our Collections
          </h1>
          <p className="text-gray-300 text-lg">
            Explore premium handpicked products.
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden border border-slate-700"
            >
              <div className="p-4">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition duration-500 cursor-pointer"
                    onClick={() => setQuickViewItem(product)}
                  />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-orange-400">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="line-through text-gray-500 text-sm">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {!isInCart(product) ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-orange-500 to-rose-600 text-white py-3 rounded-xl font-bold hover:shadow-lg"
                  >
                    Add to Cart 🛒
                  </button>
                ) : (
                  <button
                    onClick={() => removeFromCart(product)}
                    className="w-full bg-red-500 text-white py-3 rounded-xl font-bold"
                  >
                    Remove from Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No Products Found
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      {quickViewItem && (
        <QuickViewModal
          item={quickViewItem}
          onClose={() => setQuickViewItem(null)}
        />
      )}
    </main>
  );
}

/* ================= QUICK VIEW MODAL ================= */

function QuickViewModal({ item, onClose }) {
  const { addToCart, cart, removeFromCart } = useContext(ShopContext);

  const isInCart = (product) =>
    cart.some((p) => p._id === product._id);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 rounded-3xl p-8 w-full max-w-lg relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ×
          </button>

          <img
            src={item.images?.[0]}
            alt={item.name}
            className="w-full h-72 object-cover rounded-xl mb-6"
          />

          <h2 className="text-3xl font-bold text-white mb-3">
            {item.name}
          </h2>

          <p className="text-gray-400 mb-6">
            {item.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-orange-400">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="line-through text-gray-500">
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          {!isInCart(item) ? (
            <button
              onClick={() => addToCart(item)}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-600 text-white py-3 rounded-xl font-bold"
            >
              Add to Cart 🛒
            </button>
          ) : (
            <button
              onClick={() => removeFromCart(item)}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-bold"
            >
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}
