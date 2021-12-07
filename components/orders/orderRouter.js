const express = require('express');
const router = express.Router();
const orderController = require('./orderController');
const adminController = require('../admins/adminController');

router.get('/', adminController.isLogin, orderController.getOders);

module.exports = router;