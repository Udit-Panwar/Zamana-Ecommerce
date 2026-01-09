import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Product = () => {
  const { id } = useParams();
  const { addToCart, currency, cart, removeFromCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");

  const isInCart = (p) => cart.some(item => item._id === p._id);

  const getProductData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setProduct(res.data);
      setActiveImg(res.data.images?.[0] || "");

      // fetch related products by category
      const rel = await axios.get(`${import.meta.env.VITE_API_URL}/products?category=${res.data.category}`);
      setRelated(rel.data.products.filter(p => p._id !== id).slice(0, 4));
    } catch (err) {
      console.log("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      Product not found
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
        {/* Product Images */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition-all ${activeImg === img ? 'border-orange-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="text-orange-400 text-sm font-bold uppercase tracking-widest px-3 py-1 bg-orange-400/10 rounded-full border border-orange-400/20">
              {product.category}
            </span>
            {product.featured && (
              <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest px-3 py-1 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black italic" style={{ fontFamily: 'Georgia, serif' }}>
            {product.name}
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-orange-400 font-mono">
              {currency}{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xl line-through text-gray-500 font-mono">
                {currency}{product.originalPrice}
              </span>
            )}
          </div>

          <p className="text-gray-400 text-lg leading-relaxed border-l-4 border-orange-500 pl-6 py-2 mt-4">
            {product.description}
          </p>

          <div className="mt-8">
            {!isInCart(product) ? (
              <button
                onClick={() => addToCart(product)}
                className="w-full relative bg-gradient-to-r from-orange-500 to-rose-600 text-white py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:shadow-2xl hover:shadow-orange-500/40 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                <span className="relative z-10">Add to Cart 🛒</span>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </button>
            ) : (
              <button
                onClick={() => removeFromCart(product)}
                className="w-full relative bg-slate-800 text-white py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-white/10"
              >
                <span className="relative z-10 text-red-400 group-hover:text-white">In Cart - Remove?</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-gray-500 text-xs uppercase font-bold tracking-tighter">Availability</span>
              <span className={product.stock > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-gray-500 text-xs uppercase font-bold tracking-tighter">Fast Delivery</span>
              <span className="text-cyan-400 font-bold">2-4 Business Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto mt-24">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-3xl font-black italic" style={{ fontFamily: 'Georgia, serif' }}>RELATE <span className="text-orange-400">PRODUCTS</span></h3>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => (
              <ProductItem
                key={p._id}
                id={p._id}
                image={p.images}
                name={p.name}
                price={p.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
