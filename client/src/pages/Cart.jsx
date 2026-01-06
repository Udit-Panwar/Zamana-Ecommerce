
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const context = useContext(ShopContext);
  const [showPayment, setShowPayment] = React.useState(false);

  // Safety check for context
  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-red-500 text-xl">Error: Shop context not available</p>
      </div>
    );
  }

  const { cart = [], currency = "₹", removeFromCart, updateQuantity,clearCart } = context;

  // Add quantity handling

const handleIncrease = (product) => {
  if (updateQuantity && product?.cartItemId) {
    updateQuantity(product.cartItemId, (product.quantity || 1) + 1);
  }
};

const handleDecrease = (product) => {
  if (updateQuantity && product?.cartItemId) {
    const currentQty = product.quantity || 1;
    if (currentQty > 1) {
      updateQuantity(product.cartItemId, currentQty - 1);
    }
  }
};

  // Calculate item totals with safety checks
  const cartWithTotals = cart.map(item => {
    const qty = item?.quantity || 1;
    const price = item?.price || 0;
    const itemSubtotal = price * qty;
    const itemGST = itemSubtotal * 0.18;
    const itemTotal = itemSubtotal + itemGST;
  
    return {
      ...item,
      quantity: qty,
      itemSubtotal,
      itemGST,
      itemTotal
    };
  });

  // Cart totals
  const subtotal = cartWithTotals.reduce((sum, item) => sum + (item?.itemSubtotal || 0), 0);
  const totalGST = cartWithTotals.reduce((sum, item) => sum + (item?.itemGST || 0), 0);
  const totalUnits = cartWithTotals.reduce((sum, item) => sum + (item?.quantity || 0), 0);
  const shipping = cart.length > 0 ? 50 : 0;
  const grandTotal = subtotal + totalGST + shipping;

  const handleCheckout = () => setShowPayment(true);

  const handlePayment = (method) => {
    alert(`Processing payment via ${method}...
    
Order Summary:
━━━━━━━━━━━━━━
Items: ${cart.length}
Total Units: ${totalUnits}
Subtotal: ${currency}${subtotal.toFixed(2)}
GST (18%): ${currency}${totalGST.toFixed(2)}
Shipping: ${currency}${shipping.toFixed(2)}
━━━━━━━━━━━━━━
Grand Total: ${currency}${grandTotal.toFixed(2)}
━━━━━━━━━━━━━━`);
     clearCart();        // ✅ EMPTY CART
  setShowPayment(false); // optional: go back to cart view
  };

  return (
    <div className="min-h-screen w-full py-16 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden text-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-8 ml-8 bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl italic text-orange-400 mb-6">Your cart is empty.</p>
            <Link to="/collection">
              <button className="bg-gradient-to-r from-orange-500 to-rose-600 text-white py-3 px-8 rounded-xl font-semibold">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartWithTotals.map((product) => {
                // Safety checks for product data
                const productId = product?.id || Math.random();
                const productName = product?.name || "Unknown Product";
                const productImage = product?.img?.[0] || "https://via.placeholder.com/150";
                const productPrice = product?.price || 0;

                return (
                  <div
                    key={productId}
                    className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                  >
                    <div className="flex gap-6">
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-24 h-24 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-2">{productName}</h4>
                        <p className="text-orange-400 font-bold text-lg mb-1">
                          Price: {currency}{productPrice}
                        </p>

                        {/* Quantity Controller */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => handleDecrease(product)}
                            className="px-3 py-1 bg-slate-700 rounded-lg text-xl hover:bg-slate-600"
                          >
                            -
                          </button>

                          <span className="font-bold text-lg">{product.quantity}</span>

                          <button
                            onClick={() => handleIncrease(product)}
                            className="px-3 py-1 bg-slate-700 rounded-lg text-xl hover:bg-slate-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Breakdown */}
                    <div className="bg-slate-900/50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between text-slate-300">
                        <span>Item Subtotal:</span>
                        <span>{currency}{product.itemSubtotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-green-400">
                        <span>GST (18%):</span>
                        <span>+{currency}{product.itemGST.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-orange-400 font-bold text-lg border-t border-slate-700 pt-2 mt-2">
                        <span>Item Total:</span>
                        <span>{currency}{product.itemTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product)}
                      className="w-full bg-gradient-to-r from-orange-500 to-rose-600 text-white py-2 rounded-xl font-bold mt-4 hover:from-orange-600 hover:to-rose-700 transition-all"
                    >
                      Remove From Cart 🛒
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 sticky top-24">
                <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal:</span>
                    <span>{currency}{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-green-400 text-lg">
                    <span>GST (18%):</span>
                    <span>+{currency}{totalGST.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span>Shipping:</span>
                    <span>{currency}{shipping.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-slate-700 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">Grand Total:</span>
                      <span className="text-2xl font-bold text-orange-400">
                        {currency}{grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {!showPayment ? (
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-orange-500 to-rose-600 text-white py-3 rounded-xl font-bold hover:from-orange-600 hover:to-rose-700 transition-all"
                  >
                    Proceed to Payment 💳
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => handlePayment('Credit/Debit Card')}
                      className="w-full bg-slate-700/50 hover:bg-slate-700 border border-orange-500/50 hover:border-orange-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      💳 Credit/Debit Card
                    </button>
                    
                    <button
                      onClick={() => handlePayment('UPI')}
                      className="w-full bg-slate-700/50 hover:bg-slate-700 border border-orange-500/50 hover:border-orange-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      📱 UPI
                    </button>
                    
                    <button
                      onClick={() => handlePayment('Net Banking')}
                      className="w-full bg-slate-700/50 hover:bg-slate-700 border border-orange-500/50 hover:border-orange-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      🏦 Net Banking
                    </button>
                    
                    <button
                      onClick={() => handlePayment('Cash on Delivery')}
                      className="w-full bg-slate-700/50 hover:bg-slate-700 border border-orange-500/50 hover:border-orange-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      💵 Cash on Delivery
                    </button>

                    <button
                      onClick={() => setShowPayment(false)}
                      className="w-full bg-slate-600/50 hover:bg-slate-600 text-white py-2 rounded-xl transition-all"
                    >
                      ← Back to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
