

exports.login = (req, res, next) => {
	res.render('../components/auth/authViews/login');
}

exports.logout = (req, res, next) => {
	req.logout();
	res.redirect('/');
}
	