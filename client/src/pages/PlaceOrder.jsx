import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { cart, currency, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    alert("Order Placed Successfully!");
    clearCart();
    navigate('/orders');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const total = subtotal + (subtotal * 0.18) + shipping;

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4 md:px-16 lg:px-24">
      <form onSubmit={onSubmitHandler} className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-black italic" style={{ fontFamily: 'Georgia, serif' }}>DELIVERY <span className="text-orange-400">INFO</span></h2>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="text" placeholder="First Name" />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="text" placeholder="Last Name" />
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="email" placeholder="Email Address" />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="text" placeholder="Street" />
          <div className="grid grid-cols-2 gap-4">
            <input required onChange={onChangeHandler} name='city' value={formData.city} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="text" placeholder="City" />
            <input required onChange={onChangeHandler} name='state' value={formData.state} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="text" placeholder="State" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="number" placeholder="Zipcode" />
            <input required onChange={onChangeHandler} name='country' value={formData.country} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="text" placeholder="Country" />
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all" type="number" placeholder="Phone" />
        </div>
        <div className="lg:w-[450px] flex flex-col gap-8 text-white/90">
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Cart Totals</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <p>Subtotal</p>
                <p>{currency} {subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2 text-green-400 font-medium">
                <p>Tax (18%)</p>
                <p>+{currency} {(subtotal * 0.18).toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <p>Shipping</p>
                <p>{currency} {shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-xl font-bold text-orange-400 pt-2">
                <b>Total</b>
                <b>{currency} {total.toFixed(2)}</b>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Payment Method</h3>
            <div className="flex flex-col gap-4">
              <div onClick={() => setMethod('stripe')} className={`flex items-center gap-4 border border-white/10 p-3 px-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all ${method === 'stripe' ? 'border-orange-500 bg-orange-500/10' : ''}`}>
                <div className={`w-4 h-4 rounded-full border border-white/30 flex items-center justify-center p-1`}>
                  {method === 'stripe' && <div className="w-full h-full bg-orange-500 rounded-full" />}
                </div>
                <p className="font-medium text-sm">STRIPE</p>
              </div>
              <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-4 border border-white/10 p-3 px-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all ${method === 'razorpay' ? 'border-orange-500 bg-orange-500/10' : ''}`}>
                <div className={`w-4 h-4 rounded-full border border-white/30 flex items-center justify-center p-1`}>
                  {method === 'razorpay' && <div className="w-full h-full bg-orange-500 rounded-full" />}
                </div>
                <p className="font-medium text-sm">RAZORPAY</p>
              </div>
              <div onClick={() => setMethod('cod')} className={`flex items-center gap-4 border border-white/10 p-3 px-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all ${method === 'cod' ? 'border-orange-500 bg-orange-500/10' : ''}`}>
                <div className={`w-4 h-4 rounded-full border border-white/30 flex items-center justify-center p-1`}>
                  {method === 'cod' && <div className="w-full h-full bg-orange-500 rounded-full" />}
                </div>
                <p className="font-medium text-sm">CASH ON DELIVERY</p>
              </div>
            </div>
            <button type='submit' className="w-full mt-8 bg-gradient-to-r from-orange-500 to-rose-600 py-4 rounded-2xl font-black uppercase tracking-widest text-lg hover:shadow-2xl hover:shadow-orange-500/40 transform hover:scale-[1.02] transition-all">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
