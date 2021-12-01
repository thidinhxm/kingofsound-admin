const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('../components/orders/orderViews/order');
});

module.exports = router;