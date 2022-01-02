const express = require('express');
const router = express.Router();
const productService = require("./productService")



const productController = require("./productController")
const adminController = require("../admins/adminController")

router.get('/add-product/', adminController.isLogin, productController.add);

// router.post('/store', adminController.isLogin, productController.store);
router.post('/store', productService.upload2local, productController.store);



router.get('/:id/edit', adminController.isLogin, productController.edit);
router.post('/:id/update', adminController.isLogin, productController.update);

router.post('/:id/delete', adminController.isLogin, productController.delete);



router.get('/search', adminController.isLogin, productController.listByName);
router.get('/', adminController.isLogin, productController.list);


module.exports = router;
