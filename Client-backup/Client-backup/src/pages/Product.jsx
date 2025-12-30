import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
// import api from "../api/axios";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Product = () => {
  const { id } = useParams();
  const { addToCart, currency } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  const { cart, removeFromCart } = useContext(ShopContext);

  const isInCart=(product)=>{ 
    return cart.some(item => item.id === product.id)
  };

  // fetch single product
  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);

      // fetch related products by category
      const rel = await api.get(`/products/category/${res.data.category}`);
      setRelated(rel.data.filter(p => p._id !== id));

    } catch (err) {
      console.log("Error loading product:", err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      {/* Main Product Section */}
      <div style={{ display: "flex", gap: 20 }}>
        <img
          src={product.images?.[0]}
          alt={product.name}
          style={{ width: 350, height: 350, objectFit: "cover", borderRadius: 8 }}
        />

        <div>
          <h2>{product.name}</h2>
          <p style={{ fontSize: 22, fontWeight: "bold" }}>{currency}{product.price}</p>

          <p style={{ marginTop: 10, color: "#555" }}>{product.description}</p>

          { 
            !isInCart(item) ? (
              <button
                onClick={() => {addToCart(item)}}
                className="w-full relative bg-gradient-to-r from-orange-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/60 transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden group">
                <span className="relative z-10">Add to Cart 🛒</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>):
            (
              <button
                onClick={() => {removeFromCart(item)}}
                className="w-full relative bg-gradient-to-r from-orange-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/60 transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden group">
                <span className="relative z-10">Remove From Cart 🛒</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            )
            }
        </div>
      </div>

      {/* Related Products */}
      <div style={{ marginTop: 50 }}>
        <h3>Related Products</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginTop: 20,
          }}
        >
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
    </div>
  );
};

export default Product;
