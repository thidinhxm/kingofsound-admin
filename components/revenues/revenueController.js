

exports.getRevenueDay = (req, res, next) => {
    const active = { revenue: true }

    res.render('../components/revenues/revenueViews/revenue_day',{active});
}

exports.getRevenueMonth = (req, res, next) => {
    const active = { revenue: true }
    res.render('../components/revenues/revenueViews/revenue_month',{active});
}

exports.getRevenueYear = (req, res, next) => {
    const active = { revenue: true }
    res.render('../components/revenues/revenueViews/revenue_year',{active});
}