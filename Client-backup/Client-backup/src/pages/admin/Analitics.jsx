import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulated real-time data update
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Revenue data over time
  const revenueData = [
    { date: 'Mon', revenue: 4200, orders: 45, avgOrder: 93 },
    { date: 'Tue', revenue: 5800, orders: 62, avgOrder: 94 },
    { date: 'Wed', revenue: 6500, orders: 68, avgOrder: 96 },
    { date: 'Thu', revenue: 5200, orders: 55, avgOrder: 95 },
    { date: 'Fri', revenue: 7800, orders: 82, avgOrder: 95 },
    { date: 'Sat', revenue: 9200, orders: 95, avgOrder: 97 },
    { date: 'Sun', revenue: 8100, orders: 88, avgOrder: 92 }
  ];

  // Customer activity data
  const customerActivityData = [
    { time: '00:00', active: 120, inactive: 380 },
    { time: '04:00', active: 80, inactive: 420 },
    { time: '08:00', active: 250, inactive: 250 },
    { time: '12:00', active: 380, inactive: 120 },
    { time: '16:00', active: 420, inactive: 80 },
    { time: '20:00', active: 320, inactive: 180 },
    { time: '23:59', active: 200, inactive: 300 }
  ];

  // Product category sales
  const categoryData = [
    { name: 'Electronics', value: 35, sales: 12500 },
    { name: 'Clothing', value: 25, sales: 8900 },
    { name: 'Home & Garden', value: 20, sales: 7100 },
    { name: 'Sports', value: 12, sales: 4300 },
    { name: 'Books', value: 8, sales: 2850 }
  ];

  // Top selling products
  const topProducts = [
    { name: 'Wireless Headphones', sales: 342, revenue: 34200, growth: 12 },
    { name: 'Smart Watch', sales: 298, revenue: 29800, growth: 8 },
    { name: 'Laptop Stand', sales: 256, revenue: 12800, growth: -3 },
    { name: 'USB-C Cable', sales: 234, revenue: 4680, growth: 15 },
    { name: 'Phone Case', sales: 198, revenue: 3960, growth: 5 }
  ];

  // Sales by region
  const regionData = [
    { region: 'North America', sales: 45000, orders: 450, color: '#f97316' },
    { region: 'Europe', sales: 38000, orders: 380, color: '#8b5cf6' },
    { region: 'Asia', sales: 52000, orders: 520, color: '#06b6d4' },
    { region: 'South America', sales: 28000, orders: 280, color: '#10b981' },
    { region: 'Others', sales: 15000, orders: 150, color: '#6366f1' }
  ];

  // Traffic sources
  const trafficData = [
    { source: 'Direct', value: 35, color: '#f97316' },
    { source: 'Social Media', value: 28, color: '#8b5cf6' },
    { source: 'Search Engine', value: 22, color: '#06b6d4' },
    { source: 'Email', value: 10, color: '#10b981' },
    { source: 'Referral', value: 5, color: '#6366f1' }
  ];

  const COLORS = ['#f97316', '#8b5cf6', '#06b6d4', '#10b981', '#6366f1'];

  // Key metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$47,234',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/20',
      data: revenueData.map(d => d.revenue)
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/20',
      data: revenueData.map(d => d.orders)
    },
    {
      title: 'Active Customers',
      value: '8,549',
      change: '+18.7%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/20',
      data: customerActivityData.map(d => d.active)
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.4%',
      trend: 'down',
      icon: Activity,
      color: 'from-orange-500 to-rose-600',
      bgColor: 'bg-orange-500/20',
      data: [65, 68, 72, 70, 75, 73, 71]
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }, 1000);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300 text-sm mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-white text-sm font-semibold" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Real-time business insights and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:border-orange-500 transition-colors ${isRefreshing ? 'animate-pulse' : ''}`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-600 rounded-lg text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Last Update */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Activity className="w-4 h-4 text-green-400 animate-pulse" />
        <span>Live data • Last updated: {lastUpdate.toLocaleTimeString()}</span>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{metric.title}</p>
                  <h3 className="text-3xl font-bold text-white">{metric.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-1 text-sm font-semibold ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {metric.change}
                </div>
                
                <div className="flex-1 ml-4">
                  <ResponsiveContainer width="100%" height={30}>
                    <LineChart data={metric.data.map((val, i) => ({ value: val }))}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={metric.trend === 'up' ? '#10b981' : '#ef4444'} 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue & Orders Chart */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Revenue & Orders Overview</h2>
            <p className="text-slate-400 text-sm">Daily performance metrics</p>
          </div>
          <BarChart3 className="w-6 h-6 text-orange-400" />
        </div>
        
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#f97316" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              name="Revenue ($)"
            />
            <Area 
              type="monotone" 
              dataKey="orders" 
              stroke="#8b5cf6" 
              fillOpacity={1} 
              fill="url(#colorOrders)" 
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Activity & Product Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Activity */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Customer Activity</h2>
              <p className="text-slate-400 text-sm">Active vs Inactive throughout the day</p>
            </div>
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="active" fill="#10b981" name="Active" radius={[8, 8, 0, 0]} />
              <Bar dataKey="inactive" fill="#64748b" name="Inactive" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Categories */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Sales by Category</h2>
              <p className="text-slate-400 text-sm">Product category distribution</p>
            </div>
            <PieChart className="w-6 h-6 text-orange-400" />
          </div>
          
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={250}>
              <RechartsPie>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RechartsPie>
            </ResponsiveContainer>
            
            <div className="flex-1 space-y-3">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-slate-300 text-sm">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">{category.value}%</div>
                    <div className="text-slate-400 text-xs">${category.sales.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Top Selling Products</h2>
              <p className="text-slate-400 text-sm">Best performing items</p>
            </div>
            <Package className="w-6 h-6 text-blue-400" />
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-orange-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-lg flex items-center justify-center font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{product.name}</h3>
                    <p className="text-slate-400 text-sm">{product.sales} sales</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-semibold">${product.revenue.toLocaleString()}</div>
                  <div className={`flex items-center gap-1 text-sm ${product.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(product.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Region & Traffic */}
        <div className="space-y-6">
          {/* Traffic Sources */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Traffic Sources</h2>
                <p className="text-slate-400 text-sm">Where visitors come from</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {trafficData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 text-sm">{item.source}</span>
                    <span className="text-white font-semibold text-sm">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${item.value}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Sales */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Sales by Region</h2>
                <p className="text-slate-400 text-sm">Geographic distribution</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {regionData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="text-slate-300">{region.region}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">${region.sales.toLocaleString()}</div>
                    <div className="text-slate-400 text-xs">{region.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;