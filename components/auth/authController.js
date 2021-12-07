

exports.login = (req, res, next) => {
	res.render('../components/auth/authViews/login', {message: req.flash('error')[0], type: 'alert-danger'});
}

exports.logout = (req, res, next) => {
	req.logout();
	res.redirect('/');
}
	