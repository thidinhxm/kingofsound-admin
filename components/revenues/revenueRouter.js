const express = require('express');
const router = express.Router();

router.get('/day', (req, res, next) => {
  res.render('../components/revenues/revenueViews/revenue_day');
});

router.get('/month', (req, res, next) => {
    res.render('../components/revenues/revenueViews/revenue_month');
});

router.get('/year', (req, res, next) => {
    res.render('../components/revenues/revenueViews/revenue_year');
});
module.exports = router;
