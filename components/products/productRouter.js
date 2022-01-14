const express = require('express');
const router = express.Router();

const productController = require("./productController")
const adminController = require("../admins/adminController")
const categoryAPI = require("../categories/categoryAPI")
const productAPI  =require('./productAPI')

router.get('/add', adminController.isLogin, productController.add);
router.post('/add', adminController.isLogin, productController.addProductPost);

router.get('/:id/edit', adminController.isLogin, productController.edit);

router.post('/:id/update', adminController.isLogin, productController.update);

router.post('/:id/delete', adminController.isLogin, productController.delete);

router.get('/', adminController.isLogin, productController.list);

router.get('/search', adminController.isLogin, productController.listByName);

router.get('/add/subCategories', adminController.isLogin, categoryAPI.getSubCategories);

router.post('/suggest',productAPI.searchSuggest);

module.exports = router;
