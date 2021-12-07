const express = require('express');
const router = express.Router();
const revenueController = require('./revenueController');
const adminController = require('../admins/adminController');

router.get('/day', adminController.isLogin, revenueController.getRevenueDay);

router.get('/month', adminController.isLogin, revenueController.getRevenueMonth);

router.get('/year', adminController.isLogin, revenueController.getRevenueYear);

module.exports = router;
