const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/items/:category/:subcategory', productController.getItemsByCategoryAndSubcategory);
router.get('/topdeals', productController.getTopDeals);
router.get('/:id', productController.getProduct);
router.get('/:category/:subcategory', productController.getProductList);
router.put('/updateFavorites/:userId', productController.updateFavorites);
router.put('/updateCart/:userId', productController.updateCart);

module.exports = router;
