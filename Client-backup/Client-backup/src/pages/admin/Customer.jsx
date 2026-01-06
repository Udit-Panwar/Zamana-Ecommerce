import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Eye,
  X
} from 'lucide-react';

// Mock customer data - Replace with API call
const generateMockCustomers = () => {
  const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown', 'Emily Davis', 'Chris Wilson', 'Amanda Taylor', 'James Anderson', 'Lisa Martinez', 'Robert Garcia', 'Mary Rodriguez', 'William Lee', 'Patricia White', 'Thomas Harris'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const products = ['Laptop', 'Smartphone', 'Headphones', 'Tablet', 'Smart Watch', 'Camera', 'Gaming Console', 'Monitor', 'Keyboard', 'Mouse'];
  
  return Array.from({ length: 150 }, (_, i) => ({
    id: i + 1,
    name: names[Math.floor(Math.random() * names.length)],
    email: `customer${i + 1}@example.com`,
    phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    address: `${Math.floor(Math.random() * 9999) + 1} Main St, ${cities[Math.floor(Math.random() * cities.length)]}, NY ${Math.floor(Math.random() * 90000) + 10000}`,
    totalOrders: Math.floor(Math.random() * 50) + 1,
    totalSpent: Math.floor(Math.random() * 10000) + 100,
    mostPurchased: products[Math.floor(Math.random() * products.length)],
    joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    status: Math.random() > 0.2 ? 'active' : 'inactive'
  }));
};

const CustomerManagement = () => {
  const [customers] = useState(generateMockCustomers());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortBy, setSortBy] = useState('totalSpent');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 10;

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm);
      const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [customers, searchTerm, sortBy, sortOrder, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Stats
  const stats = useMemo(() => ({
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)
  }), [customers]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Customer Management</h1>
          <p className="text-slate-400">Manage and view all customer information</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Customers</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Active Customers</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.active}</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Avg Order Value</span>
            <ShoppingBag className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">${stats.avgOrderValue.toFixed(2)}</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value="totalSpent">Total Spent</option>
              <option value="totalOrders">Total Orders</option>
              <option value="name">Name</option>
              <option value="joinDate">Join Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider cursor-pointer hover:text-orange-400" onClick={() => handleSort('totalOrders')}>
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider cursor-pointer hover:text-orange-400" onClick={() => handleSort('totalSpent')}>
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Most Purchased
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-white">{customer.name}</div>
                        <div className="text-sm text-slate-400">ID: #{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Mail className="w-4 h-4 text-slate-500" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Phone className="w-4 h-4 text-slate-500" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-semibold">{customer.totalOrders}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-semibold">${customer.totalSpent.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      <ShoppingBag className="w-3 h-3" />
                      {customer.mostPurchased}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === 'active' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-slate-500/20 text-slate-300'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-orange-400"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} customers
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-orange-500'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Customer Details</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full flex items-center justify-center font-bold text-2xl">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedCustomer.name}</h3>
                  <p className="text-slate-400">Customer ID: #{selectedCustomer.id}</p>
                  <span className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedCustomer.status === 'active' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-slate-500/20 text-slate-300'
                  }`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <p className="text-white">{selectedCustomer.email}</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <p className="text-white">{selectedCustomer.phone}</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Address</span>
                  </div>
                  <p className="text-white">{selectedCustomer.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                  <div className="text-blue-300 text-sm mb-1">Total Orders</div>
                  <div className="text-2xl font-bold text-white">{selectedCustomer.totalOrders}</div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
                  <div className="text-green-300 text-sm mb-1">Total Spent</div>
                  <div className="text-2xl font-bold text-white">${selectedCustomer.totalSpent.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-sm">Most Purchased Item</span>
                </div>
                <p className="text-white font-semibold">{selectedCustomer.mostPurchased}</p>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="text-slate-400 text-sm mb-2">Member Since</div>
                <p className="text-white">{selectedCustomer.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;