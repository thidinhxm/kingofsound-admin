const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboardController');
const accountController = require('../accounts/accountController');

router.get('/', accountController.isLogin, dashboardController.index);

module.exports = router;
