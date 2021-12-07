const express = require('express');
const router = express.Router();
const accountController = require('./accountController');

router.get('/admins/add-admin/', accountController.isLogin, accountController.addAdmin);
router.post('/admins/store',accountController.createAdminAcount);


router.get('/admins', accountController.isLogin, accountController.getAdminAccounts);


router.get('/users', accountController.isLogin, accountController.getUserAccounts);

module.exports = router;
