const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productController")


    
    
    router.get('/add-product/',productsController.add);
    router.post('/store', productsController.store);
    
    router.get('/:id/edit',productsController.edit);
    router.post('/:id/update',productsController.update);
    
    router.post('/:id/delete',productsController.delete);
    
    
    router.get('/search',productsController.listByName);
    router.get('/',productsController.list);


module.exports = router;
