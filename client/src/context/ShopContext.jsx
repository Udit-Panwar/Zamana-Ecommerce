import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const currency = "₹";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      if (response.data.products) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCart = async (authToken) => {
    if (!authToken) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (response.data && response.data.items) {
        const normalizedItems = response.data.items.map(item => ({
          ...item.product,
          cartItemId: item._id,
          quantity: item.quantity,
          selectedSize: item.size || 'M'
        }));
        setCart(normalizedItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const syncWithClerk = async () => {
    if (isSignedIn && user) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/clerk-sync`, {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          name: user.fullName
        });
        const { token: localToken, user: dbUser } = response.data;
        setToken(localToken);
        setUserData(dbUser);
        localStorage.setItem("token", localToken);
        fetchCart(localToken);
      } catch (error) {
        console.error("Auth sync error:", error);
      }
    } else {
      setToken("");
      setUserData(null);
      setCart([]);
      localStorage.removeItem("token");
    }
  };

  const addToCart = async (product, size = 'M') => {
    if (!isSignedIn) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/cart/add`,
        { productId: product._id, quantity: 1, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data) {
        toast.success("Added to cart");
        fetchCart(token);
      }
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    }
  };

  const removeFromCart = async (itemOrId) => {
    let cartItemId = itemOrId;

    // If a product object is passed, find its cartItemId
    if (typeof itemOrId === 'object' && itemOrId !== null) {
      const foundItem = cart.find(item => item._id === itemOrId._id);
      if (foundItem) {
        cartItemId = foundItem.cartItemId;
      } else {
        return; // Item not in cart
      }
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/item/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart(token);
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(cartItemId);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/cart/item/${cartItemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(token);
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart([]);
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    syncWithClerk();
  }, [isSignedIn, user]);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        currency,
        token,
        userData,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchProducts
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
