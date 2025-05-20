const express = require('express');

const menuController = require('../controller/menuController');

const { getMenu, addProduct, getProduct, updateProduct, deleteProduct } =
  menuController;

const router = express.Router();

router.route('/').get(getMenu).post(addProduct);

router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
