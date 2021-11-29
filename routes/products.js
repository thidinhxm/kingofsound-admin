const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productController")


router.get('/search',productsController.listByName);
// router.get('/add-product', (req, res, next) => {
    //     res.render('products/add-product');
    // });
    
    
    router.get('/add-product/',productsController.add);
    router.post('/products/store', productsController.store);

    router.get('/:id/edit',productsController.edit);
    router.post('/products/:id',productsController.update);

    router.post('/:id',productsController.delete);


    // router.get('/edit-product', (req, res, next) => {
    router.get('/',productsController.list);
//     res.render('products/edit-product');
// });


module.exports = router;
