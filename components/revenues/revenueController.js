const revenueService = require('./revenueService')
// Daily Revenue
exports.getRevenueDay = async (req, res, next) => {
    try {
        const itemPerPage = 8;
        let page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const search_name = req.query.search_name;
        const dailyRevenue = await revenueService.dailyRevenue(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
        const active = { revenue: true, }
        const dailyRevenueCount = dailyRevenue.count[0].count
        const Pages = Math.ceil(dailyRevenueCount / itemPerPage);
        // console.log(Pages)
        let next = page < Pages - 1 ? page + 2 : 0;
        let previous = page > 0 ? page : 0;
        res.render('../components/revenues/revenueViews/revenue_day', {
            dailyRevenue: dailyRevenue.rows,
            Pages,
            search_name,
            next,
            previous,
            indexpage: page,
            active
        });
    }
    catch (err) {
        next(err);
    }
}


// Monthly Revenue

exports.getRevenueMonth = async (req, res, next) => {
    try {
        const itemPerPage = 8;
        let page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const search_name = req.query.search_name;
        const monthlyRevenue = await revenueService.monthlyRevenue(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
        const active = { revenue: true, }
        const monthlyRevenueCount = monthlyRevenue.count[0].count
        const Pages = Math.ceil(monthlyRevenueCount / itemPerPage);
        // console.log(Pages)
        let next = page < Pages - 1 ? page + 2 : 0;
        let previous = page > 0 ? page : 0;
        res.render('../components/revenues/revenueViews/revenue_month', {
            monthlyRevenue: monthlyRevenue.rows,
            Pages,
            search_name,
            next,
            previous,
            indexpage: page,
            active
        });
    }
    catch (err) {
        next(err);
    }
}

exports.getRevenueYear = async (req, res, next) => {
    try {
        const itemPerPage = 8;
        let page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const search_name = req.query.search_name;
        const yearlyRevenue = await revenueService.yearlyRevenue(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
        const active = { revenue: true, }
        const yearlyRevenueCount = yearlyRevenue.count[0].count
        const Pages = Math.ceil(yearlyRevenueCount / itemPerPage);
        // console.log(Pages)
        let next = page < Pages - 1 ? page + 2 : 0;
        let previous = page > 0 ? page : 0;
        res.render('../components/revenues/revenueViews/revenue_year', {
            yearlyRevenue: yearlyRevenue.rows,
            Pages,
            search_name,
            next,
            previous,
            indexpage: page,
            active
        });
    }
    catch (err) {
        next(err);
    }
}