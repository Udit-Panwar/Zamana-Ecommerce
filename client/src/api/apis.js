const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const cartEndpoints = {
    GET_CART_ITEMS: `${BASE_URL}/cart`,
}