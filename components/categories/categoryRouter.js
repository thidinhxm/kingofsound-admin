const express = require('express');
const router = express.Router();
const adminController = require('../admins/adminController');
const categoryController  = require('./categoryController');

router.post('/:id/delete', adminController.isLogin, categoryController.delete);
router.post('/store-category', adminController.isLogin, categoryController.storeCategory);
router.get('/add-category/', adminController.isLogin, categoryController.addCategory);
router.get('/', adminController.isLogin, categoryController.listcategory);


module.exports = router;
