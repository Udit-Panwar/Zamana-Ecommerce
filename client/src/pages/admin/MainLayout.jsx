import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Info, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Package, 
  DollarSign,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  ChevronRight,
  Activity
} from 'lucide-react';
import ProductManagement from './ProductManagement';
import OrdersManagement from './OrderManagement';
import EnhancedDashboard from './Dashboard';
import CustomerManagement from './Customer';
import AnalyticsDashboard from './Analitics';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
  ];

  
  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return <EnhancedDashboard />
      
      case 'products':
            return <ProductManagement />
        
        case 'orders':
        return <OrdersManagement />
      
      case 'customers':
        return <CustomerManagement />
      
      case 'analytics':
        return <AnalyticsDashboard />
        
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h2>
              <p className="text-slate-400">Content for {currentPage} page will be displayed here</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-40">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-slate-400 hover:text-white transition-colors"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                ZAMANA
              </h1>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center bg-slate-900/50 rounded-lg px-4 py-2 border border-slate-700">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-48"
                />
              </div>
              
              <button className="relative p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full flex items-center justify-center font-bold text-sm">
                A
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-800/50 backdrop-blur-lg border-r border-slate-700/50 
          transition-transform duration-300 z-30 pt-20 lg:pt-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 space-y-2 overflow-y-auto h-full">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-lg shadow-orange-500/20' 
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;