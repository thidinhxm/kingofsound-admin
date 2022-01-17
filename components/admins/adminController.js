const adminService = require('./adminService');

exports.adminProfile = (req, res, next) => {
	const active = { admin: true }
	res.render('../components/admins/adminViews/profile', { active });
}

exports.isLogin = (req, res, next) => {
	if (req.user) {
		next();
	}
	else {
		res.redirect('/');
	}
}


exports.editProfile = async (req, res, next) => {
	try {
		res.render('../components/admins/adminViews/edit-profile');
	}
	catch (err) {
		next(err);
	}
}

exports.updateProfile = async (req, res, next) => {
	try {
		const profile = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address,
		}

		await adminService.updateProfile(req.user.user_id, profile);
		const user = await adminService.getAdminByEmail(req.user.email);
		req.login(user, function(error) {
            if (!error) {
               res.redirect('/profile'); 
            }
        });
	}
	catch (err) {
		console.error(err)
		next(err);
	}

}

exports.changePassword = (req, res, next) => {
	res.render('../components/admins/adminViews/change-password')
}


