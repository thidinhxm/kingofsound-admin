const accountService = require("./accountService");

exports.getAdminAccounts = async(req, res, next) => {
	const adminAccounts = await accountService.listAdminAccount();
	const active = { user: true }

	res.render('../components/accounts/accountViews/admin_accounts', {adminAccounts, active});
}

exports.getUserAccounts = (req, res, next) => {
	const active = { user: true }
	res.render('../components/accounts/accountViews/user_accounts', {active});
}

exports.listAdminAccount = async (req, res) => {
	const listAdmin = await accountService.listAdminAccount();
	res.json(listAdmin);

}
exports.addAdmin =  (req, res,next) => {
	const active = { user: true }

	res.render("../components/accounts/accountViews/add-admin", {active});

}

exports.createAdminAcount = async (req, res, next) => {
	try {
		const newAdmin = await accountService.createUser({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address,
			password: req.body.password,
		});
		
		await accountService.createAdminRole({
			user_id: newAdmin.user_id,
			role_id: 2
		})
		res.redirect('/accounts/admins');
	}
	catch (error) {
		next(error);
	}
}

