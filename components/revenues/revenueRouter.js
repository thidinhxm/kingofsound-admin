const express = require('express');
const router = express.Router();
const revenueController = require('./revenueController');
const accountController = require('../accounts/accountController');

router.get('/day', accountController.isLogin, revenueController.getRevenueDay);

router.get('/month', accountController.isLogin, revenueController.getRevenueMonth);

router.get('/year', accountController.isLogin, revenueController.getRevenueYear);
module.exports = router;
