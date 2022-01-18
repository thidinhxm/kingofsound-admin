const express = require('express');
const router = express.Router();

const accountController = require('./accountController');
const adminController = require('../admins/adminController');

router.get('/admins/add', adminController.isLogin, accountController.addAdmin);

router.post('/admins/store', adminController.isLogin, accountController.createAdminAccount);

router.get('/admins', adminController.isLogin, accountController.getAdminAccounts);

router.get('/admin/:id', adminController.isLogin, accountController.adminDetail);

router.post('/unlock', adminController.isLogin, accountController.unlock);

router.post('/lock', adminController.isLogin, accountController.lock);

router.get('/users/:id', adminController.isLogin, accountController.userDetail);

router.get('/users/', adminController.isLogin, accountController.getUserAccounts);

module.exports = router;
