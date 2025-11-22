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
  getProductCategories,
  addProductCategories,
} = menuController;
const { protect, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(getMenu)
  .post(
    protect,
    restrictTo('admin', 'manager'),
    uploadProductImage,
    resizeUploadImage,
    addProduct,
  );

router.route('/images/:imgName').get(getProductImage);

router.route('/addon').get(getAddOn);
router.route('/topSixProducts').get(getTopSixProducts);
router
  .route('/categories')
  .get(getProductCategories)
  .post(protect, restrictTo('admin', 'manager'), addProductCategories);

router
  .route('/:id')
  .get(getProduct)
  .patch(
    protect,
    restrictTo('admin', 'manager'),
    uploadProductImage,
    resizeUploadImage,
    updateProduct,
  )
  .delete(protect, restrictTo('admin', 'manager'), deleteProduct);

module.exports = router;
