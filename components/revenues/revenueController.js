const revenueService = require('./revenueService')

exports.getRevenueDay = async (req, res, next) => {
    try {
        const active = { revenue: true }
        const dailyRevenue = await revenueService.dailyRevenue();
        console.log(dailyRevenue);
        res.render('../components/revenues/revenueViews/revenue_day',{dailyRevenue,active});
    }
    catch (err) {
        next(err);
    }
}

exports.getRevenueMonth = async (req, res, next) => {
    try {
        const active = { revenue: true }
        const monthlyRevenue = await revenueService.monthlyRevenue()
        res.render('../components/revenues/revenueViews/revenue_month',{active,monthlyRevenue});
    }
    catch (err) {
        next(err);
    }
}

exports.getRevenueYear = async (req, res, next) => {
    try {
        const active = { revenue: true }
        const yearlyRevenue = await revenueService.yearlyRevenue()
        res.render('../components/revenues/revenueViews/revenue_year',{active,yearlyRevenue});
    }
    catch (err) {
        next(err);
    }
}