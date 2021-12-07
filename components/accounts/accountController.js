const {models} = require("../../models");
const accountService = require("./accountService")

exports.getAdminAccounts = async(req, res, next) => {
	const adminAccounts = await accountService.listAdminAccount();
	const active = { user: true }

	res.render('../components/accounts/accountViews/admins',{adminAccounts,active});
}

exports.getUserAccounts = (req, res, next) => {
	const active = { user: true }
	res.render('../components/accounts/accountViews/user_accounts',{active});
}

exports.listAdminAccount = async (req, res) => {
	const listAdmin = await accountService.listAdminAccount();
	res.json(listAdmin);

}
exports.addAdmin =  (req, res,next) => {
	const active = { user: true }

	res.render("../components/accounts/accountViews/add-admin",{active})

}

exports.store = async (req, res) => {


	// const selectedCategory = await models.categories.findOne({where: {category_name: req.body.category}, raw: true})
	passwordHashed = req.body.password;


	const newAdmin = await models.users.create({
		
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		password: req.body.password,
		is_blocked: false,
	});
	
	const admin = await models.userroles.create({
		role_id: 2,
		user_id: newAdmin.user_id,
	});
	res.redirect('/accounts/admins')
}