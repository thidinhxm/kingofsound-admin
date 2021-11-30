const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/login', (req, res, next) => {
  res.render('login');
});



router.get('/order', (req, res, next) => {
  res.render('order');
});


module.exports = router;
