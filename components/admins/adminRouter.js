const express = require('express');
const router = express.Router();

const adminController = require('./adminController');

router.get('/profile/:id/edit-profile', adminController.isLogin, adminController.editProfile);
router.post('/profile/:id/update-profile', adminController.isLogin, adminController.updateProfile);

router.get('/profile/:id/change-password', adminController.isLogin, adminController.changePassword);


router.get('/profile', adminController.isLogin, adminController.adminProfile);


module.exports = router;