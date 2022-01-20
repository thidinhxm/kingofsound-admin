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
		const qtyCategoryMonths = await orderService.getQtySaleOfCategoryByYear(currentYear);
		const totalQtyInYear = qtyCategoryMonths.reduce((total, item) => {
			return total + item.quantityList.reduce((subtotal, subitem) => subtotal + parseInt(subitem), 0);
		}, 0);

		res.render('../components/dashboard/dashboardViews/index', { 
			top10Products, 
			orderCount, 
			orderStatus,
			revenueMonths,
			totalInYear,
			years,
			qtyCategoryMonths, 
			totalQtyInYear,
			active 
		});
	}
	catch (err) {
		next(err);
	}
}
