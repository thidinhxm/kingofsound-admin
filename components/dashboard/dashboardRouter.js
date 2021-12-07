const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboardController');
const adminController = require('../admins/adminController');

router.get('/', adminController.isLogin, dashboardController.index);

module.exports = router;
