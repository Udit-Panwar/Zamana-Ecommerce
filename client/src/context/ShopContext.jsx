import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const fetchProducts = async () => {
    // Your API logic here
  };

  const fetchCart = async () => {
    // Your fetch logic here
  };

  // FIXED: Each item gets a unique cartItemId
  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartItemId: `${product.id}_${Date.now()}_${Math.random()}`, // Unique ID
      quantity: product.quantity || 1
    };
    
    const updated = [...cart, cartItem];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    // alert(`${product.name} added to cart successfully`);
  };

  // FIXED: Remove by cartItemId (not product.id)
  const removeFromCart = (cartItem) => {
    console.log("Removing cart item:", cartItem);
    const updated = cart.filter((item) => item.cartItemId !== cartItem.cartItemId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    // alert(`${cartItem.name} removed from cart successfully`);
  };

  // FIXED: Update quantity by cartItemId
  const updateQuantity = (cartItemId, newQuantity) => {
    setCart(prevCart => {
      const updated = prevCart.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart"); // important if you're persisting cart
};

  
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <ShopContext.Provider
      value={{ cart, currency, addToCart, removeFromCart, updateQuantity,clearCart }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;