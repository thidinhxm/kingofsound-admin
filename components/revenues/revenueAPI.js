const revenueService = require('./revenueService');
const {formatPrice} = require('../orders/orderHelper');
exports.getRevenueMonthsByYear = async (req, res, next) => {
    try {
        const year = req.query.year;
        const revenueMonths = await revenueService.getRevenueMonthsByYear(year);
        const totalInYear = formatPrice(revenueMonths.reduce((total, item) => total + parseInt(item.totalRevenue), 0));

        res.json({
            revenueMonths,
            totalInYear,
            success: true
        });
    }
    catch (err) {
        res.json({
            success: false,
        });
    }
}