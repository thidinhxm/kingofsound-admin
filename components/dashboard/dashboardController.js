exports.index = (req, res, next) => {
	const active = {dashboard: true};
	res.render('../components/dashboard/dashboardViews/index', {active});
}