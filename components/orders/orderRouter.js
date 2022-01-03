const express = require('express');
const router = express.Router();
const orderController = require('./orderController');
const adminController = require('../admins/adminController');

router.get('/:id/edit', adminController.isLogin, orderController.edit);
router.post('/update', adminController.isLogin, orderController.update);
router.get('/', adminController.isLogin, orderController.getOders);

module.exports = router;