const express = require('express');
const router = express.Router();

const orderController = require('./orderController');
const adminController = require('../admins/adminController');
const orderAPI = require('./orderAPI');

router.get('/:id/edit', adminController.isLogin, orderController.edit);

router.post('/update', adminController.isLogin, orderController.update);

router.get('/', adminController.isLogin, orderController.getOders);

router.post('/paginate', adminController.isLogin, orderAPI.getOrdersPaginate);

module.exports = router;