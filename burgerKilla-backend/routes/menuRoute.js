const express = require('express');

const menuController = require('../controller/menuController');
const authController = require('../controller/authController');
const { path } = require('../app');

const {
  getMenu,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  resizeUploadImage,
  getProductImage,
  getAddOn,
  getTopSixProducts,
} = menuController;
const { protect, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(getMenu)
  .post(uploadProductImage, resizeUploadImage, addProduct);

router.route('/images/:imgName').get(getProductImage);

router.route('/addon').get(getAddOn);
router.route('/topSixProducts').get(getTopSixProducts);

router
  .route('/:id')
  .get(getProduct)
  .patch(uploadProductImage, resizeUploadImage, updateProduct)
  .delete(deleteProduct);

module.exports = router;
