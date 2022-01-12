const express = require('express');
const router = express.Router();
const adminController = require('../admins/adminController');
const brandController  = require('./brandController');

router.post('/:id/delete', adminController.isLogin, brandController.delete);

router.get('/', adminController.isLogin, brandController.listBrands);

module.exports = router;
