const express = require('express');
const router = express.Router();


router.get('/admin', (req, res, next) => {
  res.render('../components/accounts/accountViews/admin_account');
});

router.get('/users', (req, res, next) => {
    res.render('../components/accounts/accountViews/user_accounts');
});

module.exports = router;
