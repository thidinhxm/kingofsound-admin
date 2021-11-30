const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productController")


// router.get('/add-product', (req, res, next) => {
    //     res.render('products/add-product');
    // });
    
    
    router.get('/add-product/',productsController.add);
    router.post('/store', productsController.store);
    
    router.get('/:id/edit',productsController.edit);
    router.post('/:id/update',productsController.update);
    
    router.post('/:id',productsController.delete);
    
    
    router.get('/search',productsController.listByName);
    // router.get('/edit-product', (req, res, next) => {
    router.get('/',productsController.list);
//     res.render('products/edit-product');
// });


module.exports = router;
