const express = require('express');
const router = express.Router();
const accountController = require('./accountController');
const adminController = require('../admins/adminController');

router.get('/admins/add-admin/', adminController.isLogin, accountController.addAdmin);

router.post('/admins/store', adminController.isLogin, accountController.createAdminAcount);

router.get('/admins', adminController.isLogin, accountController.getAdminAccounts);


router.get('/users/:id/profile', adminController.isLogin, accountController.userDetail);

router.get('/users', adminController.isLogin, accountController.getUserAccounts);

module.exports = router;
