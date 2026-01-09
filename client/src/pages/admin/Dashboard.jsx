import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Activity,
  Package,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Clock,
  Calendar
} from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShopContext } from '../../context/ShopContext';

const EnhancedDashboard = () => {
  const { token } = useContext(ShopContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    products: 0,
    conversion: 2.5 // Mock conversion
  });

  const [recentActivity, setRecentActivity] = useState([]);

  // Mock data for charts that stay static but look good
  const [salesData] = useState([
    { day: 'Mon', sales: 45000 },
    { day: 'Tue', sales: 52000 },
    { day: 'Wed', sales: 48000 },
    { day: 'Thu', sales: 61000 },
    { day: 'Fri', sales: 55000 },
    { day: 'Sat', sales: 58000 },
    { day: 'Sun', sales: 49000 }
  ]);

  const categoryData = [
    { name: 'Clothing', value: 45, color: '#f97316' },
    { name: 'Accessories', value: 25, color: '#ec4899' },
    { name: 'Footwear', value: 20, color: '#8b5cf6' },
    { name: 'Others', value: 10, color: '#06b6d4' }
  ];

  const topProducts = [
    { name: 'Premium Silk Saree', sales: 124, revenue: 45000 * 124, trend: 15.2 },
    { name: 'Designer Lehenga', sales: 89, revenue: 85000 * 89, trend: 10.5 },
    { name: 'Modern Kurta Set', sales: 256, revenue: 15000 * 256, trend: -3.2 },
    { name: 'Bridal Collection', sales: 42, revenue: 120000 * 42, trend: 22.4 }
  ];

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setStats(prev => ({ ...prev, ...res.data.stats }));
        if (res.data.recentOrders) {
          const activities = res.data.recentOrders.map(o => ({
            id: o.id,
            action: `Order ${o.status}`,
            user: o.user,
            time: new Date(o.time).toLocaleTimeString(),
            amount: `₹${o.amount?.toLocaleString() || '0'}`,
            type: 'order'
          }));
          setRecentActivity(activities);
        }
      }
    } catch (err) {
      console.error("Stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    if (token) fetchDashboardStats();
    return () => clearInterval(timer);
  }, [token]);

  const statsConfig = [
    {
      label: 'Total Revenue',
      value: `₹${(stats.revenue || 0).toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      trend: 'up'
    },
    {
      label: 'Total Orders',
      value: (stats.orders || 0).toLocaleString(),
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      trend: 'up'
    },
    {
      label: 'Total Users',
      value: (stats.users || 0).toLocaleString(),
      change: '+23.1%',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      trend: 'up'
    },
    {
      label: 'Total Products',
      value: (stats.products || 0).toLocaleString(),
      change: '+4.4%',
      icon: Package,
      color: 'from-orange-500 to-rose-600',
      trend: 'up'
    }
  ];

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (loading && !stats.revenue) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 rounded-2xl p-4 md:p-6 lg:p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Welcome back to ZAMANA! 👋</h1>
            <p className="text-white/90 text-sm md:text-base">Your dashboard is now connected to real-time data.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-white/20">
            <div className="text-xl md:text-2xl font-bold font-mono text-center">{formatTime(currentTime)}</div>
            <div className="text-xs md:text-sm opacity-75 mt-1 text-center">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat, idx) => (
          <div key={idx} className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-orange-500/50 transition-all shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-emerald-400 text-sm font-bold">{stat.change}</span>
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/80 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Area type="monotone" dataKey="sales" stroke="#f97316" fill="url(#salesGrad)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-slate-300">{cat.name}</span>
                </div>
                <span className="text-white font-bold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-slate-900/40 rounded-lg border border-slate-700/50">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{activity.action}</p>
                  <p className="text-slate-400 text-xs">{activity.user} • {activity.time}</p>
                </div>
                <div className="text-emerald-400 font-bold text-sm">{activity.amount}</div>
              </div>
            )) : (
              <div className="text-center py-10 text-slate-500 italic">No recent activity</div>
            )}
          </div>
        </div>

        <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-all font-bold">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{p.name}</p>
                    <p className="text-slate-500 text-xs">{p.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-bold">₹{p.revenue.toLocaleString()}</p>
                  <span className={`text-[10px] font-bold ${p.trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {p.trend > 0 ? '+' : ''}{p.trend}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;