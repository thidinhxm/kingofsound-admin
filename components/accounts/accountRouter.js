const express = require('express');
const router = express.Router();
const accountController = require('./accountController');

router.get('/admins', accountController.getAdminAccounts);

router.get('/users', accountController.getUserAccounts);

module.exports = router;
