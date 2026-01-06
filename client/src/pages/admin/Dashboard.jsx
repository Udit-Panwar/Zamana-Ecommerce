import React, { useState, useEffect } from 'react';
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
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const EnhancedDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    revenue: 245890,
    orders: 1284,
    users: 8549,
    conversion: 3.24
  });

  const [salesData, setSalesData] = useState([
    { day: 'Mon', sales: 45000, orders: 120, visitors: 1200 },
    { day: 'Tue', sales: 52000, orders: 145, visitors: 1350 },
    { day: 'Wed', sales: 48000, orders: 135, visitors: 1180 },
    { day: 'Thu', sales: 61000, orders: 168, visitors: 1520 },
    { day: 'Fri', sales: 55000, orders: 152, visitors: 1420 },
    { day: 'Sat', sales: 58000, orders: 160, visitors: 1480 },
    { day: 'Sun', sales: 49000, orders: 142, visitors: 1290 }
  ]);

  const [revenueData, setRevenueData] = useState([
    { time: '00:00', amount: 12000 },
    { time: '04:00', amount: 8000 },
    { time: '08:00', amount: 25000 },
    { time: '12:00', amount: 35000 },
    { time: '16:00', amount: 42000 },
    { time: '20:00', amount: 38000 },
    { time: '23:59', amount: 28000 }
  ]);

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#f97316' },
    { name: 'Clothing', value: 25, color: '#ec4899' },
    { name: 'Home & Garden', value: 20, color: '#8b5cf6' },
    { name: 'Sports', value: 12, color: '#06b6d4' },
    { name: 'Books', value: 8, color: '#10b981' }
  ];

  const topProducts = [
    { name: 'Wireless Earbuds Pro', sales: 234, revenue: 303660, trend: 12.5 },
    { name: 'Smart Watch Series 5', sales: 189, revenue: 755811, trend: 8.3 },
    { name: 'Gaming Headset', sales: 156, revenue: 935844, trend: -2.1 },
    { name: 'Bluetooth Speaker', sales: 142, revenue: 269558, trend: 15.7 },
    { name: 'Phone Case Bundle', sales: 128, revenue: 76800, trend: 5.2 }
  ];

  const recentActivity = [
    { id: 1, action: 'New order received', user: 'Rajesh Kumar', time: '2 min ago', amount: '₹1,299', type: 'order' },
    { id: 2, action: 'Product review added', user: 'Priya Sharma', time: '15 min ago', amount: null, type: 'review' },
    { id: 3, action: 'Payment completed', user: 'Amit Patel', time: '1 hour ago', amount: '₹3,499', type: 'payment' },
    { id: 4, action: 'New user registered', user: 'Sneha Reddy', time: '2 hours ago', amount: null, type: 'user' }
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats with random changes
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000) - 200,
        orders: prev.orders + Math.floor(Math.random() * 5) - 1,
        users: prev.users + Math.floor(Math.random() * 10) - 2,
        conversion: prev.conversion + (Math.random() * 0.1 - 0.05)
      }));

      // Update sales data
      setSalesData(prev => prev.map(item => ({
        ...item,
        sales: item.sales + Math.floor(Math.random() * 2000) - 1000,
        orders: item.orders + Math.floor(Math.random() * 10) - 5
      })));

      // Update revenue data
      setRevenueData(prev => {
        const newData = [...prev];
        const lastIndex = newData.length - 1;
        newData[lastIndex] = {
          ...newData[lastIndex],
          amount: newData[lastIndex].amount + Math.floor(Math.random() * 500) - 250
        };
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statsConfig = [
    { 
      label: 'Total Revenue', 
      value: `₹${stats.revenue.toLocaleString()}`, 
      change: '+12.5%', 
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-600',
      trend: 'up'
    },
    { 
      label: 'Total Orders', 
      value: stats.orders.toLocaleString(), 
      change: '+8.2%', 
      icon: ShoppingCart, 
      color: 'from-blue-500 to-cyan-600',
      trend: 'up'
    },
    { 
      label: 'Active Users', 
      value: stats.users.toLocaleString(), 
      change: '+23.1%', 
      icon: Users, 
      color: 'from-purple-500 to-pink-600',
      trend: 'up'
    },
    { 
      label: 'Conversion Rate', 
      value: `${stats.conversion.toFixed(2)}%`, 
      change: '+2.4%', 
      icon: Activity, 
      color: 'from-orange-500 to-rose-600',
      trend: 'up'
    }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border-2 border-orange-500/50 rounded-xl p-3 shadow-xl">
          <p className="text-white font-bold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Sales') || entry.name.includes('Revenue') || entry.name.includes('amount') 
                ? `₹${entry.value.toLocaleString()}` 
                : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section with Real-Time Clock */}
      <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 rounded-2xl p-4 md:p-6 lg:p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Welcome back to ZAMANA! 👋</h1>
            <p className="text-white/90 text-sm md:text-base">Here's what's happening with your store in real-time.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-semibold opacity-90">Live Time</span>
            </div>
            <div className="text-xl md:text-2xl font-bold font-mono">{formatTime(currentTime)}</div>
            <div className="text-xs md:text-sm opacity-75 mt-1">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600/50 hover:border-orange-500/50 transition-all hover:scale-[1.02] group shadow-xl">
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                  ) : (
                    <ArrowDown className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                  )}
                  <span className={`text-xs md:text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 text-xs md:text-sm mb-1 font-medium">{stat.label}</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
              <div className="mt-2 md:mt-3 flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">Live</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600/50 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white">Weekly Sales Overview</h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">Real-time sales data</p>
            </div>
            <select className="bg-slate-900/80 border-2 border-slate-600/50 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-orange-500 w-full sm:w-auto">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#f97316" 
                strokeWidth={3}
                fill="url(#salesGradient)" 
                name="Sales (₹)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600/50 shadow-xl">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* <Tooltip content={<CustomTooltip />} /> */}
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-slate-300">{cat.name}</span>
                </div>
                <span className="text-white font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Revenue Trend */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600/50 shadow-xl">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">Today's Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '11px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '11px' }} />
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
                name="Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600/50 shadow-xl">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30 hover:border-orange-400/50 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-400 font-bold text-sm">#{index + 1}</span>
                      <h4 className="text-white font-semibold text-sm">{product.name}</h4>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-400">{product.sales} sales</span>
                      <span className="text-xs text-emerald-400 font-semibold">₹{product.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${product.trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {product.trend > 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    <span className="text-xs font-bold">{Math.abs(product.trend)}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-rose-600 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(product.sales / 250) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg md:text-xl font-bold text-white">Recent Activity</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-semibold">Live</span>
            </div>
          </div>
          <div className="space-y-3 md:space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3 pb-3 md:pb-4 border-b border-slate-700/50 last:border-0 hover:bg-slate-900/30 rounded-lg p-2 transition-all">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'order' ? 'bg-orange-500' :
                  activity.type === 'payment' ? 'bg-emerald-500' :
                  activity.type === 'review' ? 'bg-purple-500' : 'bg-cyan-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">{activity.action}</p>
                  <p className="text-xs text-slate-300 truncate">{activity.user}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-slate-400">{activity.time}</p>
                    {activity.amount && (
                      <p className="text-xs text-emerald-400 font-bold">{activity.amount}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600/50 shadow-xl">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Product', icon: Package, color: 'from-blue-500 to-cyan-600' },
              { label: 'View Orders', icon: ShoppingCart, color: 'from-purple-500 to-pink-600' },
              { label: 'Customer List', icon: Users, color: 'from-green-500 to-emerald-600' },
              { label: 'Analytics', icon: TrendingUp, color: 'from-orange-500 to-rose-600' },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button key={index} className="flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 bg-slate-900/50 hover:bg-slate-900/70 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-all group hover:scale-105 shadow-lg">
                  <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-xs md:text-sm text-slate-300 font-medium text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;