const accountService = require("./accountService");

exports.getAdminAccounts = async (req, res, next) => {
	const adminsRowAndCount = await accountService.listAdmins();
	const pagination = {
		page: 1,
		limit: 5,
		totalRows: adminsRowAndCount.count,
		pages: Math.ceil(adminsRowAndCount.count / 5) || 1
	}

	const active = { user: true };
	res.render('../components/accounts/accountViews/admin-accounts', { 
		admins: adminsRowAndCount.rows,
		totalAdmins: adminsRowAndCount.count,
		pagination, 
		active 
	});
}

exports.addAdmin = (req, res, next) => {
	const active = { user: true }
	res.render("../components/accounts/accountViews/add-admin", { active });
}

exports.createAdminAccount = async (req, res, next) => {
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

exports.adminDetail = async (req, res, next) => {
	try {
		const user = await accountService.getUserById(req.params.id);
		const active = { user: true }
		res.render('../components/accounts/accountViews/admin-detail', { user, active });
	}
	catch (error) {
		next(error);
	}
}
exports.userDetail = async (req, res, next) => {
	try {
		const currentUser = await accountService.getUserById(req.params.id);
		const active = { user: true }
		res.render('../components/accounts/accountViews/user-detail', { currentUser, active })
	}
	catch (error) {
		next(error);
	}
}

exports.getUserAccounts = async (req, res, next) => {

	try {
		const active = { user: true }
		const usersRowAndCount = await accountService.listUsers();
		const pagination = {
			page: 1,
            limit: 5,
            totalRows: usersRowAndCount.count,
            pages: Math.ceil(usersRowAndCount.count / 5) || 1
		}
		res.render('../components/accounts/accountViews/user-accounts', { 
			users: usersRowAndCount.rows,
			totalUsers: usersRowAndCount.count.length,
			active, 
			pagination 
		});
	}
	catch (error) {
		console.log(error);
		next(error);
	}
}

exports.unlock = async (req, res) => {
	try {
		await accountService.unlock(req.body.user_id)
		const userRole = await accountService.userRole(req.body.user_id);
		res.redirect('/accounts/'+ userRole);
	}
	catch (err) { console.log(err) }
};

exports.lock = async (req, res) => {
	try {
		await accountService.lock(req.body.user_id)
		const userRole = await accountService.userRole(req.body.user_id)
		res.redirect('/accounts/'+ userRole);
	}
	catch (err) { console.log(err) }
};

