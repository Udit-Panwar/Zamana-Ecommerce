const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

// Dashboard stats
router.get('/stats', auth, isAdmin, adminController.getDashboardStats);

// Order management
router.get('/orders', auth, isAdmin, adminController.getAllOrders);
router.get('/orders/:id', auth, isAdmin, adminController.getOrderById);
router.put('/orders/:id/status', auth, isAdmin, adminController.updateOrderStatus);
router.put('/orders/:id/notes', auth, isAdmin, adminController.updateOrderNotes);

// Customer management
router.get('/customers', auth, isAdmin, adminController.getAllCustomers);
router.get('/customers/:id', auth, isAdmin, adminController.getCustomerDetails);
router.put('/users/:id/promote', auth, isAdmin, adminController.promoteUser);
router.delete('/users/:id', auth, isAdmin, adminController.deleteUser);

// Analytics
router.get('/analytics', auth, isAdmin, adminController.getAnalytics);

module.exports = router;
