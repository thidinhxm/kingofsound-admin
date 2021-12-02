

exports.getRevenueDay = (req, res, next) => {
    res.render('../components/revenues/revenueViews/revenue_day');
}

exports.getRevenueMonth = (req, res, next) => {
    res.render('../components/revenues/revenueViews/revenue_month');
}

exports.getRevenueYear = (req, res, next) => {
    res.render('../components/revenues/revenueViews/revenue_year');
}