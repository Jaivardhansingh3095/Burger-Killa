const express = require('express');

const authController = require('../controller/authController');
const userController = require('../controller/userController');

const { signup, login, protect, restrictTo, forgetPassword, resetPassword } =
  authController;
const {
  getMe,
  updateMe,
  addAddress,
  updateAddress,
  deleteAddress,
  addNewOrder,
  createEmployee,
} = userController;

const router = express.Router();

//Athentication routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword/:token', resetPassword);
router.post('/createEmployee', protect, restrictTo('admin'), createEmployee);

//User routes
router.get('/currentUser', protect, getMe);
router.post('/updateme', protect, updateMe);
router.post('/addAddress', protect, addAddress);
router.post('/updateAddress', protect, updateAddress);
router.post('/deleteAddress', protect, deleteAddress);
router.route('/order').patch(protect, addNewOrder);

module.exports = router;
