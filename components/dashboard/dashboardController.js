const productService = require('../products/productService');
const orderService = require('../orders/orderService');
const revenueService = require('../revenues/revenueService');
const {formatPrice} = require('../orders/orderHelper');
exports.index = async (req, res, next) => {
	try {
		const active = { dashboard: true };
		const top10Products = await productService.getTop10Products();
		const orderListCount = await orderService.getOrdersGroupByStatus();
		
		const orderCount = orderListCount.map(item => item.total);
		const orderStatus = orderListCount.map(item => item.order_status);

		const currentYear = new Date().getFullYear();
		const revenueMonths = await revenueService.getRevenueMonthsByYear(currentYear);
		const totalInYear = formatPrice(revenueMonths.reduce((total, item) => total + parseInt(item.totalRevenue), 0));
		const years = [...Array(5).keys()].map(item => currentYear - item);
		res.render('../components/dashboard/dashboardViews/index', { 
			top10Products, 
			orderCount, 
			orderStatus,
			revenueMonths,
			totalInYear,
			years, 
			active 
		});
	}
	catch (err) {
		next(err);
	}
}
