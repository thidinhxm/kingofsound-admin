const productService = require('../products/productService');
exports.index = async (req, res, next) => {
	try {
		const active = { dashboard: true };
		const top10Products = await productService.getTop10Products();
		console.log(top10Products);
		res.render('../components/dashboard/dashboardViews/index', { top10Products, active });
	}
	catch (err) {
		next(err);
	}
}
