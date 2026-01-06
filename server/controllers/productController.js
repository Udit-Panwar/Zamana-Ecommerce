
const Product = require('../models/Product');

// Get all products with filtering and pagination
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 100, category, search, sort } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }
    
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ============================================
// ADMIN ONLY - CREATE, UPDATE, DELETE
// ============================================

// Create new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      images,
      stock,
      featured,
      tags
    } = req.body;

    // Validation
    if (!name || !description || !price || !category || stock === undefined) {
      return res.status(400).json({ 
        message: 'Please provide name, description, price, category, and stock' 
      });
    }

    // Check if price is valid
    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be greater than 0' });
    }

    // Check if stock is valid
    if (stock < 0) {
      return res.status(400).json({ message: 'Stock cannot be negative' });
    }

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      category,
      images: images || [],
      stock,
      featured: featured || false,
      tags: tags || []
    });

    await product.save();
    
    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate price if provided
    if (req.body.price !== undefined && req.body.price <= 0) {
      return res.status(400).json({ message: 'Price must be greater than 0' });
    }

    // Validate stock if provided
    if (req.body.stock !== undefined && req.body.stock < 0) {
      return res.status(400).json({ message: 'Stock cannot be negative' });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ 
      message: 'Product deleted successfully',
      deletedProduct: product
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Bulk create products (Admin only - useful for seeding)
exports.bulkCreateProducts = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of products' });
    }

    const createdProducts = await Product.insertMany(products);

    res.status(201).json({
      message: `${createdProducts.length} products created successfully`,
      products: createdProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};