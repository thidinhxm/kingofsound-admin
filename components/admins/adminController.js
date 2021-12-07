exports.adminProfile = (req, res, next) => {
	const active = { admin: true }
	res.render('../components/admins/adminViews/profile', {active});
}

exports.isLogin = (req, res, next) => {
	if (req.user) {
		next();
	}
	else {
		res.redirect('/');
	}
}