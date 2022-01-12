const express = require('express');
const router = express.Router();
const voucherController = require('./voucherController');
const adminController = require('../admins/adminController');

router.get('/:id/edit', adminController.isLogin, voucherController.edit);
router.post('/:id/delete', adminController.isLogin, voucherController.delete);
router.get('/add-voucher', adminController.isLogin, voucherController.add);
router.post('/store-voucher', adminController.isLogin, voucherController.store);


router.get('/', adminController.isLogin, voucherController.index);

module.exports = router;

