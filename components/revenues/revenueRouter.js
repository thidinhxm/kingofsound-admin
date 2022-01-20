const express = require('express');
const router = express.Router();
const revenueController = require('./revenueController');
const adminController = require('../admins/adminController');
const revenueAPI = require('./revenueAPI');

router.get('/day', adminController.isLogin, revenueController.getRevenueDay);

router.get('/month', adminController.isLogin, revenueController.getRevenueMonth);

router.get('/year', adminController.isLogin, revenueController.getRevenueYear);

router.get('/revenue-by-year', adminController.isLogin, revenueAPI.getRevenueMonthsByYear);
module.exports = router;
