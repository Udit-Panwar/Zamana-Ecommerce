import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
  const { currency, products } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Mocking order data for display
  useEffect(() => {
    if (products.length > 0) {
      setOrderData(products.slice(0, 3).map(p => ({
        ...p,
        status: 'Order Placed',
        payment: 'COD',
        date: new Date().toLocaleDateString()
      })));
    }
  }, [products]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-black italic" style={{ fontFamily: 'Georgia, serif' }}>MY <span className="text-orange-400">ORDERS</span></h2>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
        </div>

        <div className="flex flex-col gap-6">
          {orderData.map((item, index) => (
            <div key={index} className="bg-slate-900/50 p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-orange-500/30 transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 overflow-hidden rounded-2xl border border-white/5">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.images?.[0]} alt="" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <p>{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 font-mono">Date: <span className="text-cyan-400">{item.date}</span></p>
                  <p className="mt-1 text-xs text-gray-500 font-mono">Payment: <span className="text-orange-400">{item.payment}</span></p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-sm font-bold text-green-400">{item.status}</p>
                </div>
                <button className="px-6 py-2 border border-white/10 rounded-xl text-sm font-bold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
