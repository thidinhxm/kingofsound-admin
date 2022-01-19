const express = require('express');
const router = express.Router();
const voucherController = require('./voucherController');
const adminController = require('../admins/adminController');
const voucherAPI = require('./voucherAPI');


router.get('/:id/edit', adminController.isLogin, voucherController.edit);

router.post('/:id/update', adminController.isLogin, voucherController.updateVoucher);

router.get('/add', adminController.isLogin, voucherController.add);

router.post('/store', adminController.isLogin, voucherController.store);

router.post('/check-exist', voucherAPI.checkExistVoucher)

router.get('/', adminController.isLogin, voucherController.index);

module.exports = router;

