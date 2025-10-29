const express = require('express');
const paymentController = require('../controller/paymentController');
const authController = require('../controller/authController');

const { createRrazorpayOrder, validatePaymentSignature } = paymentController;
const { protect } = authController;

const router = express.Router();

router.post('/razorpay/order', protect, createRrazorpayOrder);
router.post('/razorpay/order/validate', validatePaymentSignature);

module.exports = router;
