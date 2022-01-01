const orderService = require('../orders/orderService');

exports.index = async (req, res, next) => {
	try {
		const active = { dashboard: true };
		const listTop10 = await orderService.getTop10();

		res.render('../components/dashboard/dashboardViews/index', { listTop10, active });
	}
	catch (err) {
		next(err);
	}
}
