const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const adminService = require('../admins/adminService');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await adminService.getAdminByEmail(email);
        if (!user) {
            return done(null, false, req.flash('error', 'Email không tồn tại'));
        }
        if (!validPassword(user, password)) {
            return done(null, false, req.flash('error', 'Mật khẩu không đúng'));
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

function validPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.serializeUser(function(user, done) {
    done(null,user);
});

passport.deserializeUser(function(user, done) {
    return done(null, user);
});

module.exports = passport;