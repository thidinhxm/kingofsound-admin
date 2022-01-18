const accountService = require("./accountService");
const { models } = require("../../models");

exports.getAdminAccounts = async (req, res, next) => {
	const adminAccounts = await accountService.listAdminAccount();
	const active = { user: true }
	const currentAdminID = req.user.user_id;
	console.log(req.user.user_id)
	res.render('../components/accounts/accountViews/admin-accounts', { adminAccounts,currentAdminID, active });
}

exports.addAdmin = (req, res, next) => {
	const active = { user: true }
	res.render("../components/accounts/accountViews/add-admin", { active });
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

exports.userDetail = async (req, res, next) => {
	try {
		const userID = req.params.id
		const currentUser = await models.users.findOne({ where: { user_id: userID }, raw: true })
		const currentUserCredit = await accountService.totalCredit(userID);

		let totalAmount = 0;
		if (currentUserCredit.length > 0) {
			totalAmount = currentUserCredit[0].total_amount;
		}
		const active = { user: true }

		res.render('../components/accounts/accountViews/user-detail', { currentUser, totalAmount, active })
	}
	catch (error) {
		next(error);
	}
}

exports.edit = async (req, res, next) => {
	const currentUser = await models.users.findOne({ where: { user_id: req.params.id }, raw: true })
	const userRole = await accountService.userRole(req.params.id)
	const active = { user: true }

	res.render('../components/accounts/accountViews/account-edit', { currentUser, userRole, active });
}

exports.update = async (req, res, next) => {
	const userUpdate = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
	}
	const userRole = await accountService.userRole(req.params.id)
	await models.users.update(userUpdate, { where: { user_id: req.params.id } })
	res.redirect('/accounts/' + userRole)

}

exports.getUserAccounts = async (req, res, next) => {

	try {
		const search_name = req.query.search_name;
		const active = { user: true }
		const itemPerPage = 8;
		let page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;

		if (search_name) {
			const users = await accountService.listByUsername(search_name, page);
			const Pages = Math.round(users.count / itemPerPage);
			let next = page < Pages - 1 ? page + 2 : Pages;
			let previous = page > 0 ? page : 1;
			res.render('../components/accounts/accountViews/user-accounts', {
				userAccounts: users.rows,
				Pages,
				next,
				previous,
				search_name,
				indexpage: page,
				active
			});
		}
		else {
			const users = await accountService.listUserPage(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
			const Pages = Math.floor(users.count / itemPerPage) + 1;
			let next = page < Pages - 1 ? page + 2 : Pages;
			let previous = page > 0 ? page : 1;
			res.render('../components/accounts/accountViews/user-accounts', {
				userAccounts: users.rows,
				Pages,
				indexpage: page,
				next,
				previous,
				active
			});
		}
	}
	catch (error) {
		console.log(error);
		next(error);
	}
}

exports.unlock = async (req, res) => {
	try {
		await accountService.unlock(req.params.id)
		const userRole = await accountService.userRole(req.params.id)
		res.redirect('/accounts/'+ userRole);
			res.redirect('/accounts/users/');
	}
	catch (err) { console.log(err) }
};

exports.lock = async (req, res) => {
	try {
		await accountService.lock(req.params.id)
		const userRole = await accountService.userRole(req.params.id)
		res.redirect('/accounts/'+ userRole);
	}
	catch (err) { console.log(err) }
};


exports.deleteAdmin = async (req, res) => {
	try {
		await models.users.update(
			{
				is_blocked: true
			}, {
			where: {
				user_id: req.params.id,
			}
		})
		res.redirect('/accounts/admins/');
	}
	catch (err) { console.log(err) }
};