const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/stripe/create', paymentController.createStripePayment);
router.post('/stripe/confirm', paymentController.confirmStripePayment);
router.post('/stripe/webhook', express.raw({type: 'application/json'}), paymentController.stripeWebhook);

module.exports = router;