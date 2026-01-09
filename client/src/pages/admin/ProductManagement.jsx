import React, { useState, useEffect, useContext } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  Search,
  Package,
  ImageIcon,
  Eye,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/products";

const ProductManagement = () => {
  const { token, fetchProducts: updateGlobalProducts } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });

  /* ================= NOTIFICATION ================= */
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      const data = res.data;

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
          ? data.products
          : [];

      const normalized = list.map((p) => ({
        id: p._id || p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        stock: p.stock,
        images: p.images || [],
      }));

      setProducts(normalized);
    } catch (err) {
      console.error("Fetch error:", err);
      showNotification('Failed to load products', 'error');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image size should be less than 5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setCurrentProduct((prev) => ({
        ...prev,
        images: [reader.result],
      }));
    };
    reader.readAsDataURL(file);
  };

  /* ================= MODAL ================= */
  const openAddModal = () => {
    setEditMode(false);
    setCurrentProduct({ id: "", name: "", description: "", price: "", category: "", stock: "", images: [] });
    setImagePreview("");
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditMode(true);
    setCurrentProduct({ ...product, images: [...(product.images || [])] });
    setImagePreview(product.images?.[0] || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setCurrentProduct({
      id: "",
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      images: []
    });
    setImagePreview("");
  };

  /* ================= VALIDATE ================= */
  const validateProduct = () => {
    if (!currentProduct.name.trim()) {
      showNotification('Product name is required', 'error');
      return false;
    }
    if (!currentProduct.description.trim()) {
      showNotification('Product description is required', 'error');
      return false;
    }
    if (!currentProduct.price || parseFloat(currentProduct.price) <= 0) {
      showNotification('Valid price is required', 'error');
      return false;
    }
    if (!currentProduct.category.trim()) {
      showNotification('Category is required', 'error');
      return false;
    }
    if (currentProduct.stock === "" || parseInt(currentProduct.stock) < 0) {
      showNotification('Valid stock quantity is required', 'error');
      return false;
    }
    return true;
  };

  /* ================= ADD PRODUCT ================= */
  const handleAddProduct = async () => {
    if (!validateProduct()) return;

    try {
      setLoading(true);
      const res = await axios.post(API_URL, currentProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const saved = res.data.product || res.data;

      setProducts((prev) => [
        ...prev,
        { ...saved, id: saved._id || saved.id },
      ]);

      showNotification('Product added successfully!', 'success');
      updateGlobalProducts(); // Update the main store
      closeModal();
    } catch (err) {
      console.error("Add error:", err.response?.data?.message || err.message);
      showNotification(err.response?.data?.message || 'Failed to add product', 'error');
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE PRODUCT ================= */
  const handleUpdateProduct = async () => {
    if (!validateProduct()) return;

    try {
      setLoading(true);

      const res = await axios.put(`${API_URL}/${currentProduct.id}`, currentProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updated = res.data.product || res.data;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === currentProduct.id ? { ...p, ...updated } : p
        )
      );

      showNotification('Product updated successfully!', 'success');
      updateGlobalProducts(); // Update the main store 
      closeModal();
    } catch (err) {
      console.error("Update error:", err.response?.data?.message || err.message);
      showNotification(err.response?.data?.message || 'Failed to update product', 'error');
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      updateGlobalProducts(); // Update the main store
      showNotification('Product deleted successfully!', 'success');
    } catch (err) {
      console.error("Delete error:", err.response?.data?.message || err.message);
      showNotification(err.response?.data?.message || 'Failed to delete product', 'error');
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 lg:p-8">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-slideIn ${notification.type === 'success'
          ? 'bg-green-500/90 text-white'
          : 'bg-red-500/90 text-white'
          }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent mb-2">
            Product Management
          </h1>
          <p className="text-slate-400">Manage your product inventory</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-slate-700/50 mb-6 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700">
                <span className="text-slate-400">Total Products: </span>
                <span className="text-white font-bold">{products.length}</span>
              </div>
            </div>

            {/* Add Product Button */}
            <button
              onClick={openAddModal}
              className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/25"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && !products.length ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400 text-lg">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-12 border border-slate-700/50 inline-block">
              <Package className="w-20 h-20 text-slate-600 mx-auto mb-4" />
              <p className="text-xl text-slate-400 mb-2">
                {searchTerm ? 'No products found' : 'No products yet'}
              </p>
              <p className="text-slate-500 text-sm mb-6">
                {searchTerm ? 'Try a different search term' : 'Add your first product to get started'}
              </p>
              {!searchTerm && (
                <button
                  onClick={openAddModal}
                  className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Product
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all group hover:scale-[1.02] shadow-lg"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-slate-900/50 overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-slate-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full bg-white/90 hover:bg-white text-slate-900 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
                        <Eye className="w-4 h-4" />
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 truncate">{product.name}</h3>
                  <p className="text-sm text-slate-400 mb-1 line-clamp-1">{product.category}</p>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2 h-10">{product.description}</p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700/50">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
                      ID: {String(product.id).slice(-6)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 hover:border-blue-500 text-blue-400 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 text-red-400 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  {editMode ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Product Image
                  </label>
                  <div className="flex flex-col items-center gap-4">
                    {imagePreview ? (
                      <div className="relative w-full h-56 bg-slate-900/50 rounded-xl overflow-hidden border-2 border-slate-700">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setCurrentProduct({ ...currentProduct, images: [] });
                          }}
                          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-lg transition-all shadow-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-full h-56 border-2 border-dashed border-slate-700 hover:border-orange-500 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-900/30 hover:bg-slate-900/50 group">
                        <Upload className="w-12 h-12 text-slate-500 mb-3 group-hover:text-orange-400 transition-colors" />
                        <span className="text-slate-400 text-sm font-medium">Click to upload image</span>
                        <span className="text-slate-600 text-xs mt-1">PNG, JPG, JPEG up to 5MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Product ID (Edit Mode) */}
                {editMode && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Product ID
                    </label>
                    <input
                      type="text"
                      value={currentProduct.id}
                      disabled
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                )}

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Product Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentProduct.name}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, name: e.target.value })
                    }
                    placeholder="Enter product name"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                {/* Product Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={currentProduct.description}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, description: e.target.value })
                    }
                    placeholder="Enter detailed product description"
                    rows={4}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentProduct.category}
                      onChange={(e) =>
                        setCurrentProduct({ ...currentProduct, category: e.target.value })
                      }
                      placeholder="e.g. T-Shirt, Jeans"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Stock <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={currentProduct.stock}
                      onChange={(e) =>
                        setCurrentProduct({ ...currentProduct, stock: e.target.value })
                      }
                      placeholder="0"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Product Price */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, price: e.target.value })
                    }
                    placeholder="Enter price"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={editMode ? handleUpdateProduct : handleAddProduct}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/25"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editMode ? 'Update Product' : 'Add Product'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductManagement;