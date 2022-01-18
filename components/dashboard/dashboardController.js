const productService = require('../products/productService');
const orderService = require('../orders/orderService');
exports.index = async (req, res, next) => {
	try {
		const active = { dashboard: true };
		const top10Products = await productService.getTop10Products();
		const orderListCount = await orderService.getOrdersGroupByStatus();
		
		const orderCount = orderListCount.map(item => item.total);
		const orderStatus = orderListCount.map(item => item.order_status);
		res.render('../components/dashboard/dashboardViews/index', { 
			top10Products, 
			orderCount, 
			orderStatus, 
			active 
		});
	}
	catch (err) {
		next(err);
	}
}
