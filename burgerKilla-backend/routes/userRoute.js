const express = require('express');

const authController = require('../controller/authController');
const userController = require('../controller/userController');

const { signup, login, protect, restrictTo } = authController;
const { getMe, updateMe, addAddress, updateAddress, deleteAddress } =
  userController;

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/currentUser', protect, getMe);
router.post('/updateme', protect, updateMe);
router.post('/addAddress', protect, addAddress);
router.post('/updateAddress', protect, updateAddress);
router.post('/deleteAddress', protect, deleteAddress);

module.exports = router;
