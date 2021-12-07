const express = require('express');
const router = express.Router();
const orderController = require('./orderController');
const accountController = require('../accounts/accountController');

router.get('/', accountController.isLogin, orderController.getOders);

module.exports = router;