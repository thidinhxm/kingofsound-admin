const express = require('express');
const router = express.Router();

const orderController = require('./orderController');
const adminController = require('../admins/adminController');
const orderAPI = require('./orderAPI');

router.get('/:id/edit', adminController.isLogin, orderController.getDetails);

router.get('/', adminController.isLogin, orderController.listOders);

router.post('/paginate', adminController.isLogin, orderAPI.getOrdersPaginate);

router.post('/:id/update', adminController.isLogin, orderAPI.updateStatus);

module.exports = router;