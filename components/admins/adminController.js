const { models } = require("../../models");

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
		// const active = { admin: true }
		const currentAdmin = await models.users.findOne({ where: { user_id: req.params.id }, raw: true })

		res.render('../components/admins/adminViews/edit-profile', { currentAdmin });
		// res.json({currentAdmin})
	}
	catch (err) {
		next(err);
	}
}

exports.updateProfile = async (req, res, next) => {
	try {
		const adminUpdate = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address,
		}

		await models.users.update(adminUpdate, { where: { user_id: req.params.id } })
		res.redirect('/admin/profile')
	}
	catch (err) {
		next(err);
	}

}

exports.changePassword = (req, res, next) => {
	res.render('../components/admins/adminViews/change-password')
}
