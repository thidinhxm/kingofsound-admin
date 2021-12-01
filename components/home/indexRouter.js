const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('../components/home/homeViews/index');
});


router.get('/login', (req, res, next) => {
  res.render('../components/homeViews/login');
});

module.exports = router;
