const express = require('express');
const router = express.Router();
const passport = require('./passport');
const authController = require('./authController');

router.get('/', authController.login);
router.get('/login', authController.login);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/logout', authController.logout);
module.exports = router;
