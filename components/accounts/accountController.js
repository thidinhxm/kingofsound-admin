const accountService = require("./accountService");
const { models } = require("../../models");

exports.getAdminAccounts = async(req, res, next) => {
	const adminAccounts = await accountService.listAdminAccount();
	const active = { user: true }

	res.render('../components/accounts/accountViews/admin_accounts', {adminAccounts, active});
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

exports.getUserAccounts = async (req, res, next) => {
	const active = { user: true }
	const userAccounts = await accountService.listUserAccount();
	res.render('../components/accounts/accountViews/user_accounts', {userAccounts,active});
}
exports.userDetail = async(req, res, next) =>{
	const userID = req.params.id
	const currentUser = await models.users.findOne({ where: { user_id: userID }, raw: true })
	const currentUserCredit = await accountService.totalCredit(userID);
	const totalAmount = currentUserCredit[0].total_amount;
	res.render('../components/accounts/accountViews/user_detail',{currentUser,totalAmount})
}

