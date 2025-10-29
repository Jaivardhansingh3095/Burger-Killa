const express = require('express');

const paymentSessionController = require('../controller/paymentSessionController');
const authController = require('../controller/authController');

const {
  createPaymentSession,
  getPaymentSession,
  invalidatePaymentSession,
  updatePaymentSession,
  getALLPaymentSession,
  deletePaymentSession,
} = paymentSessionController;

const { protect, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .post(protect, createPaymentSession)
  .get(protect, restrictTo('admin', 'manager'), getALLPaymentSession);

router
  .route('/:sessionId')
  .get(protect, getPaymentSession)
  .patch(protect, updatePaymentSession)
  .delete(protect, restrictTo('admin'), deletePaymentSession);

router.route('/:sessionId/invalidate').patch(protect, invalidatePaymentSession);

module.exports = router;
