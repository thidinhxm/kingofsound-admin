const express = require('express');
const router = express.Router();


router.get('/admin', (req, res, next) => {
  res.render('accounts/admin_account');
});

router.get('/users', (req, res, next) => {
    res.render('accounts/user_accounts');
});

module.exports = router;
