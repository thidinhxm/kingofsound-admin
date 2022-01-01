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


exports.editProfile = async (req, res,next) => {
	// const active = { admin: true }
		const currentAdmin = await models.users.findOne({ where: { user_id: req.params.id }, raw: true })

		res.render('../components/accounts/accountViews/edit-profile',{currentAdmin});
	}


exports.updateProfile = async (req, res, next) => {
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

exports.changePassword =  (req, res, next) => {
	res.render('../components/admins/adminViews/change-password')
}
