const express = require('express');

const orderController = require('../controller/orderController');
const authController = require('../controller/authController');

const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrder,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
  getActiveOrderByUser,
} = orderController;
const { protect, restrictTo } = authController;

router.route('/').post(protect, createOrder).get(protect, getOrdersByUser);
router.route('/activeOrder').get(protect, getActiveOrderByUser);

router
  .route('/allOrders')
  .get(protect, restrictTo('admin', 'manager'), getAllOrders);

router
  .route('/:orderId')
  .get(protect, getOrder)
  .patch(protect, restrictTo('admin', 'manager'), updateOrderStatus)
  .delete(protect, restrictTo('admin'), deleteOrder);

module.exports = router;
