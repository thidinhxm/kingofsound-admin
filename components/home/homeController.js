exports.index = (req, res, next) => {
	const active = { dashboard: true }
	res.render('../components/home/homeViews/index',{active});
}