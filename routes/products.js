const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('/products/products');
});

router.get('/add-product', (req, res, next) => {
    res.render('products/add-product');
});

router.get('/edit-product', (req, res, next) => {
    res.render('products/edit-product');
});
module.exports = router;
