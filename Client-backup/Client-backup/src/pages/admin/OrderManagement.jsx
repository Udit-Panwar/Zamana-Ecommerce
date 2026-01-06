import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronDown,
  Calendar,
  MapPin,
  Phone,
  Mail,
  X
} from 'lucide-react';

const OrdersManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dateFilter, setDateFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-001234',
      customer: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      date: '2026-01-05',
      time: '10:30 AM',
      status: 'delivered',
      total: 2499,
      items: 3,
      address: '123, MG Road, Bangalore, Karnataka - 560001',
      products: [
        { name: 'Wireless Earbuds', quantity: 1, price: 1299 },
        { name: 'Phone Case', quantity: 2, price: 600 }
      ],
      payment: 'Online',
      trackingId: 'TRK123456789'
    },
    {
      id: 'ORD-001235',
      customer: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43211',
      date: '2026-01-05',
      time: '11:45 AM',
      status: 'processing',
      total: 4999,
      items: 2,
      address: '456, Park Street, Mumbai, Maharashtra - 400001',
      products: [
        { name: 'Smart Watch', quantity: 1, price: 3999 },
        { name: 'Screen Protector', quantity: 1, price: 1000 }
      ],
      payment: 'COD',
      trackingId: 'TRK123456790'
    },
    {
      id: 'ORD-001236',
      customer: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 98765 43212',
      date: '2026-01-04',
      time: '03:20 PM',
      status: 'shipped',
      total: 1899,
      items: 1,
      address: '789, Gandhi Nagar, Ahmedabad, Gujarat - 380001',
      products: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 1899 }
      ],
      payment: 'Online',
      trackingId: 'TRK123456791'
    },
    {
      id: 'ORD-001237',
      customer: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 98765 43213',
      date: '2026-01-04',
      time: '09:15 AM',
      status: 'pending',
      total: 3499,
      items: 4,
      address: '321, Banjara Hills, Hyderabad, Telangana - 500034',
      products: [
        { name: 'Power Bank', quantity: 2, price: 2400 },
        { name: 'USB Cable', quantity: 2, price: 1099 }
      ],
      payment: 'Online',
      trackingId: 'TRK123456792'
    },
    {
      id: 'ORD-001238',
      customer: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 98765 43214',
      date: '2026-01-03',
      time: '02:30 PM',
      status: 'cancelled',
      total: 5999,
      items: 1,
      address: '654, Connaught Place, New Delhi - 110001',
      products: [
        { name: 'Gaming Headset', quantity: 1, price: 5999 }
      ],
      payment: 'Online',
      trackingId: 'TRK123456793'
    },
    {
      id: 'ORD-001239',
      customer: 'Ananya Iyer',
      email: 'ananya.iyer@email.com',
      phone: '+91 98765 43215',
      date: '2026-01-03',
      time: '11:00 AM',
      status: 'delivered',
      total: 2799,
      items: 2,
      address: '987, Anna Nagar, Chennai, Tamil Nadu - 600040',
      products: [
        { name: 'Laptop Stand', quantity: 1, price: 1999 },
        { name: 'Wireless Mouse', quantity: 1, price: 800 }
      ],
      payment: 'COD',
      trackingId: 'TRK123456794'
    }
  ];

  const statusConfig = {
    all: { label: 'All Orders', color: 'slate', icon: Package },
    pending: { label: 'Pending', color: 'yellow', icon: Clock },
    processing: { label: 'Processing', color: 'blue', icon: Package },
    shipped: { label: 'Shipped', color: 'purple', icon: Truck },
    delivered: { label: 'Delivered', color: 'green', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'red', icon: XCircle }
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
        ${status === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
        ${status === 'processing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
        ${status === 'shipped' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
        ${status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
        ${status === 'cancelled' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
      `}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && order.date === '2026-01-05') ||
                       (dateFilter === 'yesterday' && order.date === '2026-01-04') ||
                       (dateFilter === 'week' && ['2026-01-03', '2026-01-04', '2026-01-05'].includes(order.date));
    return matchesStatus && matchesSearch && matchesDate;
  });

  const stats = [
    { label: 'Total Orders', value: orders.length, change: '+12.5%', color: 'from-blue-500 to-cyan-600' },
    { 
      label: 'Pending Orders', 
      value: orders.filter(o => o.status === 'pending').length, 
      change: '+5.2%', 
      color: 'from-yellow-500 to-orange-600' 
    },
    { 
      label: 'Completed', 
      value: orders.filter(o => o.status === 'delivered').length, 
      change: '+18.3%', 
      color: 'from-green-500 to-emerald-600' 
    },
    { 
      label: 'Revenue', 
      value: `₹${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, 
      change: '+22.4%', 
      color: 'from-purple-500 to-pink-600' 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Orders Management</h2>
          <p className="text-slate-400 text-sm mt-1">Track and manage all your orders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-rose-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all">
          <Download className="w-4 h-4" />
          Export Orders
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-5 border border-slate-600/50 hover:border-orange-400/50 transition-all hover:scale-[1.02] shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-emerald-400 text-sm font-bold">{stat.change}</span>
            </div>
            <p className="text-slate-300 text-sm mb-1 font-medium">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-4 border border-slate-600/50 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 flex items-center bg-slate-900/80 rounded-xl px-4 py-3 border-2 border-slate-600/50 focus-within:border-orange-500/50 transition-all shadow-inner">
            <Search className="w-5 h-5 text-orange-400 mr-3" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer, or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 w-full font-medium"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
            {Object.entries(statusConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStatus(key)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all font-semibold shadow-lg ${
                    selectedStatus === key
                      ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 text-white scale-105 shadow-orange-500/50'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white border-2 border-slate-600/50 hover:border-orange-400/50 hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{config.label}</span>
                </button>
              );
            })}
          </div>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-slate-900/80 border-2 border-slate-600/50 focus:border-orange-500/50 rounded-xl px-4 py-3 text-sm text-white font-semibold focus:outline-none transition-all shadow-lg"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl border-2 border-slate-600/50 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-orange-500/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-400 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-rose-500/10 transition-all">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-orange-400">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{order.customer}</span>
                      <span className="text-xs text-slate-300">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{order.date}</span>
                      <span className="text-xs text-slate-300">{order.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-cyan-400">{order.items} items</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-emerald-400">₹{order.total.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2.5 hover:bg-orange-500/20 rounded-xl transition-all group border-2 border-transparent hover:border-orange-400/50"
                    >
                      <Eye className="w-5 h-5 text-slate-300 group-hover:text-orange-400 transition-colors" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-2xl mb-4">
              <Package className="w-16 h-16 text-orange-400 mx-auto" />
            </div>
            <p className="text-slate-300 font-medium text-lg">No orders found matching your criteria</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-600/50 shadow-2xl shadow-orange-500/20">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 border-b-2 border-orange-400/30 p-6 flex items-center justify-between shadow-lg">
              <div>
                <h3 className="text-2xl font-bold text-white">Order Details</h3>
                <p className="text-sm text-white/90 mt-1 font-semibold">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all border-2 border-transparent hover:border-white/30"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status and Date */}
              <div className="flex items-center justify-between bg-slate-900/50 rounded-xl p-4 border-2 border-slate-700/50">
                {getStatusBadge(selectedOrder.status)}
                <div className="text-right">
                  <p className="text-sm text-slate-300 font-semibold">Placed on</p>
                  <p className="text-sm font-bold text-white">{selectedOrder.date} at {selectedOrder.time}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl p-5 space-y-4 border-2 border-slate-700/50 shadow-lg">
                <h4 className="font-bold text-white flex items-center gap-2 text-lg">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-rose-600 rounded-lg">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  Customer Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">{selectedOrder.customer}</p>
                      <p className="text-slate-300">{selectedOrder.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <p className="text-white font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <p className="text-white font-medium">{selectedOrder.email}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl p-5 space-y-4 border-2 border-slate-700/50 shadow-lg">
                <h4 className="font-bold text-white text-lg">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between py-3 px-4 bg-slate-800/50 rounded-lg border border-slate-700/30 hover:border-orange-400/50 transition-all">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{product.name}</p>
                        <p className="text-xs text-cyan-400 font-medium">Quantity: {product.quantity}</p>
                      </div>
                      <p className="text-base font-bold text-emerald-400">₹{product.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl p-5 space-y-4 border-2 border-slate-700/50 shadow-lg">
                <h4 className="font-bold text-white text-lg">Payment Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between bg-slate-800/50 p-3 rounded-lg">
                    <span className="text-slate-300 font-semibold">Payment Method</span>
                    <span className="text-white font-bold">{selectedOrder.payment}</span>
                  </div>
                  <div className="flex justify-between bg-slate-800/50 p-3 rounded-lg">
                    <span className="text-slate-300 font-semibold">Tracking ID</span>
                    <span className="text-orange-400 font-mono text-xs font-bold">{selectedOrder.trackingId}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t-2 border-orange-500/30">
                    <span className="text-white font-bold text-base">Total Amount</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all border-2 border-slate-600 hover:border-slate-500 text-white shadow-lg">
                  Print Invoice
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/30 transition-all text-white shadow-lg">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;