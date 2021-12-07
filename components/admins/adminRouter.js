const express = require('express');
const router = express.Router();

const adminController = require('./adminController');

router.get('/profile', adminController.isLogin, adminController.adminProfile);

module.exports = router;