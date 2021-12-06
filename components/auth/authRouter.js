const express = require('express');
const router = express.Router();
const passport = require('./passport');
const authController = require('./authController');

router.get('/login', authController.login);
router.get('/', authController.login);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}), (req, res, next) => {
    console.log('passport auth success');
    if (req.user) {
        res.redirect('/dashboard');
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;
