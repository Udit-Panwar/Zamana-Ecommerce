const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        // Aggregation for total revenue and orders
        const orders = await Order.find();
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        // Fetch recent orders
        const recentOrders = await Order.find()
            .limit(5)
            .sort({ createdAt: -1 })
            .populate('user', 'name email');

        // Order status counts
        const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
        const confirmedOrders = await Order.countDocuments({ orderStatus: 'confirmed' });
        const shippedOrders = await Order.countDocuments({ orderStatus: 'shipped' });
        const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });

        res.json({
            success: true,
            stats: {
                revenue: totalRevenue,
                orders: totalOrders,
                users: totalUsers,
                products: totalProducts,
                pendingOrders,
                confirmedOrders,
                shippedOrders,
                deliveredOrders
            },
            recentOrders: recentOrders.map(o => ({
                id: o._id,
                orderNumber: o.orderNumber,
                user: o.user?.name || 'Guest',
                userEmail: o.user?.email || '',
                amount: o.totalAmount,
                status: o.orderStatus,
                time: o.createdAt
            }))
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all orders with filtering
exports.getAllOrders = async (req, res) => {
    try {
        const { status, search, page = 1, limit = 10, dateFilter } = req.query;

        let query = {};

        // Status filter
        if (status && status !== 'all') {
            query.orderStatus = status;
        }

        // Date filter
        if (dateFilter) {
            const now = new Date();
            let startDate;

            if (dateFilter === 'today') {
                startDate = new Date(now.setHours(0, 0, 0, 0));
            } else if (dateFilter === 'yesterday') {
                startDate = new Date(now.setDate(now.getDate() - 1));
                startDate.setHours(0, 0, 0, 0);
            } else if (dateFilter === 'week') {
                startDate = new Date(now.setDate(now.getDate() - 7));
            }

            if (startDate) {
                query.createdAt = { $gte: startDate };
            }
        }

        // Search filter
        if (search) {
            const searchRegex = new RegExp(search, 'i');

            // Find users matching search first
            const matchingUsers = await User.find({
                $or: [
                    { name: searchRegex },
                    { email: searchRegex }
                ]
            }).select('_id');

            const matchingUserIds = matchingUsers.map(user => user._id);

            // Add to main query
            query.$or = [
                { orderNumber: searchRegex },
                { user: { $in: matchingUserIds } }
            ];
        }

        const total = await Order.countDocuments(query);

        // Fetch orders with pagination
        const orders = await Order.find(query)
            .populate('user', 'name email phone')
            .populate('items.product', 'name images')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // No post-processing needed for search
        const filteredOrders = orders;

        res.json({
            success: true,
            orders: filteredOrders.map(order => ({
                id: order._id,
                orderNumber: order.orderNumber,
                customer: order.user?.name || 'Guest',
                email: order.user?.email || '',
                phone: order.user?.phone || '',
                date: order.createdAt,
                status: order.orderStatus,
                paymentStatus: order.paymentStatus,
                total: order.totalAmount,
                items: order.items.length,
                shippingAddress: order.shippingAddress,
                trackingNumber: order.trackingNumber,
                adminNotes: order.adminNotes,
                estimatedDelivery: order.estimatedDelivery,
                products: order.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }))
            })),
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalOrders: total
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('items.product', 'name images price');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({
            success: true,
            order: {
                id: order._id,
                orderNumber: order.orderNumber,
                customer: order.user?.name || 'Guest',
                email: order.user?.email || '',
                phone: order.user?.phone || '',
                date: order.createdAt,
                status: order.orderStatus,
                paymentStatus: order.paymentStatus,
                paymentMethod: order.paymentMethod,
                total: order.totalAmount,
                shippingAddress: order.shippingAddress,
                trackingNumber: order.trackingNumber,
                adminNotes: order.adminNotes,
                estimatedDelivery: order.estimatedDelivery,
                statusHistory: order.statusHistory,
                items: order.items.map(item => ({
                    product: item.product?._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, note } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Add to status history
        order.statusHistory.push({
            status: status,
            timestamp: new Date(),
            note: note || `Status changed to ${status}`
        });

        order.orderStatus = status;
        await order.save();

        res.json({
            success: true,
            message: 'Order status updated successfully',
            order: {
                id: order._id,
                status: order.orderStatus,
                statusHistory: order.statusHistory
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order notes and tracking
exports.updateOrderNotes = async (req, res) => {
    try {
        const { adminNotes, trackingNumber, estimatedDelivery } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (adminNotes !== undefined) order.adminNotes = adminNotes;
        if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;
        if (estimatedDelivery !== undefined) order.estimatedDelivery = estimatedDelivery;

        await order.save();

        res.json({
            success: true,
            message: 'Order updated successfully',
            order: {
                id: order._id,
                adminNotes: order.adminNotes,
                trackingNumber: order.trackingNumber,
                estimatedDelivery: order.estimatedDelivery
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('name email phone createdAt');

        const customersWithStats = await Promise.all(users.map(async (user) => {
            const orders = await Order.find({ user: user._id });
            const totalOrders = orders.length;
            const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

            // Find most purchased product
            const productCounts = {};
            orders.forEach(order => {
                order.items.forEach(item => {
                    const productName = item.name;
                    productCounts[productName] = (productCounts[productName] || 0) + item.quantity;
                });
            });

            const mostPurchased = Object.keys(productCounts).length > 0
                ? Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b)
                : 'N/A';

            return {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                joinDate: user.createdAt,
                totalOrders,
                totalSpent,
                mostPurchased,
                status: totalOrders > 0 ? 'active' : 'inactive'
            };
        }));

        res.json({
            success: true,
            customers: customersWithStats
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get customer details with order history
exports.getCustomerDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('name email phone createdAt');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        const orders = await Order.find({ user: user._id })
            .populate('items.product', 'name')
            .sort({ createdAt: -1 });

        const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.json({
            success: true,
            customer: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                joinDate: user.createdAt,
                totalOrders: orders.length,
                totalSpent,
                orders: orders.map(order => ({
                    id: order._id,
                    orderNumber: order.orderNumber,
                    date: order.createdAt,
                    status: order.orderStatus,
                    total: order.totalAmount,
                    items: order.items.length
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get analytics data
exports.getAnalytics = async (req, res) => {
    try {
        const { timeRange = '7d' } = req.query;

        // Calculate date range
        const now = new Date();
        let startDate;

        if (timeRange === '24h') {
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        } else if (timeRange === '7d') {
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (timeRange === '30d') {
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        } else if (timeRange === '90d') {
            startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        }

        // Get orders in range
        const orders = await Order.find({ createdAt: { $gte: startDate } })
            .populate('items.product', 'name category');

        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalOrders = orders.length;

        // Get total users
        const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
        const totalProducts = await Product.countDocuments();

        // Revenue data by day
        const revenueData = [];
        const days = timeRange === '24h' ? 24 : (timeRange === '7d' ? 7 : 30);

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const dayStart = new Date(date.setHours(0, 0, 0, 0));
            const dayEnd = new Date(date.setHours(23, 59, 59, 999));

            const dayOrders = orders.filter(o => {
                const orderDate = new Date(o.createdAt);
                return orderDate >= dayStart && orderDate <= dayEnd;
            });

            const dayRevenue = dayOrders.reduce((sum, order) => sum + order.totalAmount, 0);

            revenueData.push({
                date: dayStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                revenue: dayRevenue,
                orders: dayOrders.length,
                avgOrder: dayOrders.length > 0 ? Math.round(dayRevenue / dayOrders.length) : 0
            });
        }

        // Category sales
        const categoryData = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                const category = item.product?.category || 'Other';
                categoryData[category] = (categoryData[category] || 0) + item.price * item.quantity;
            });
        });

        const categoryArray = Object.entries(categoryData).map(([name, sales]) => ({
            name,
            sales,
            value: Math.round((sales / totalRevenue) * 100)
        }));

        // Top products
        const productSales = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                const productName = item.name;
                if (!productSales[productName]) {
                    productSales[productName] = { sales: 0, revenue: 0 };
                }
                productSales[productName].sales += item.quantity;
                productSales[productName].revenue += item.price * item.quantity;
            });
        });

        const topProducts = Object.entries(productSales)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        res.json({
            success: true,
            analytics: {
                metrics: {
                    totalRevenue,
                    totalOrders,
                    totalUsers,
                    totalProducts,
                    avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
                    conversionRate: 3.24 // This would need cart sessions tracking
                },
                revenueData,
                categoryData: categoryArray,
                topProducts
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Promote user to admin
exports.promoteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ success: false, message: 'User is already an admin' });
        }

        user.role = 'admin';
        await user.save();

        res.json({
            success: true,
            message: `User ${user.name} promoted to admin successfully`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Prevent deleting self
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ success: false, message: 'Cannot delete your own admin account' });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: `User ${user.name} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
