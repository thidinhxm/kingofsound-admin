const express = require('express');
const router = express.Router();
const voucherController = require('./voucherController');
const adminController = require('../admins/adminController');

router.get('/:id/edit', adminController.isLogin, voucherController.edit);
router.get('/', adminController.isLogin, voucherController.index);

module.exports = router;

