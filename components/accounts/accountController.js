exports.getAdminAccounts = (req, res, next) => {
	res.render('../components/accounts/accountViews/admin_accounts');
}

exports.getUserAccounts = (req, res, next) => {
	res.render('../components/accounts/accountViews/user_accounts');
}