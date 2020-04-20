const express = require('express');
const path = require('path');
const shopController = require('../controllers/shop.js');


 router = express.Router();



 router.get('/',shopController.getIndex);
 router.get('/Products',shopController.getProduct);
 router.get('/cart',shopController.getCart);
 router.get('/orders',shopController.getOrders);
 router.get('/checkout');
 router.get('/product-detail');

module.exports = router; 