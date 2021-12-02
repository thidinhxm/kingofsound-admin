const express = require('express');
const router = express.Router();
const revenueController = require('./revenueController');

router.get('/day', revenueController.getRevenueDay);

router.get('/month', revenueController.getRevenueMonth);

router.get('/year', revenueController.getRevenueYear);
module.exports = router;
