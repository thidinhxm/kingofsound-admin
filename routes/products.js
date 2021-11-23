const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productController")

router.get('/',productsController.list);
router.get('/search',productsController.listByName);
router.get('/add-product', (req, res, next) => {
    res.render('products/add-product');
});

router.get('/edit-product', (req, res, next) => {
    res.render('products/edit-product');
});
module.exports = router;
