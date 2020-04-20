const express = require('express');
const path = require('path');

const adminController = require('../controllers/admin');

router = express.Router() ;


router.post('/add-product', adminController.postAddProduct);
router.get('/add-product', adminController.getAddProducts );
router.get('/products', adminController.getAdminProduct);
router.get('/edit-product', adminController.getEditProduct);



module.exports = router;