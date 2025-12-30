const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrder);
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;