const revenueService = require('./revenueService')

exports.getRevenueDay = async (req, res, next) => {
    const active = { revenue: true }
    const dailyRevenue = await revenueService.dailyRevenue()
    res.render('../components/revenues/revenueViews/revenue_day',{dailyRevenue,active});
}

exports.getRevenueMonth = async (req, res, next) => {
    const active = { revenue: true }
    const monthlyRevenue = await revenueService.monthlyRevenue()
    res.render('../components/revenues/revenueViews/revenue_month',{active,monthlyRevenue});
}

exports.getRevenueYear = async (req, res, next) => {
    const active = { revenue: true }
    const yearlyRevenue = await revenueService.yearlyRevenue()
    res.render('../components/revenues/revenueViews/revenue_year',{active,yearlyRevenue});
}