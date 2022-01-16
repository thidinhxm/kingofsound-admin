const express = require('express');
const router = express.Router();

const adminController = require('./adminController');

router.get('/profile', adminController.isLogin, adminController.adminProfile);

router.get('/profile/edit', adminController.isLogin, adminController.editProfile);

router.post('/profile/update', adminController.isLogin, adminController.updateProfile);

router.get('/profile/change-password', adminController.isLogin, adminController.changePassword);

// router.post('/profile/change-password', adminController.isLogin, adminController.updatePassword);



module.exports = router;