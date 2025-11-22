const express = require('express');
const categoryController = require('../controller/categoryController');
const authController = require('../controller/authController');

const { getCategories, addCategories } = categoryController;
const { protect, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(protect, restrictTo('admin'), addCategories);

module.exports = router;
