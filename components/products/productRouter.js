const express = require('express');
const router = express.Router();

const productController = require("./productController")
const accountController = require("../accounts/accountController")

router.get('/add-product/', accountController.isLogin, productController.add);
router.post('/store', accountController.isLogin, productController.store);

router.get('/:id/edit', accountController.isLogin, productController.edit);
router.post('/:id/update', accountController.isLogin, productController.update);

router.post('/:id/delete', accountController.isLogin, productController.delete);


router.get('/search', accountController.isLogin, productController.listByName);
router.get('/', accountController.isLogin, productController.list);


module.exports = router;
