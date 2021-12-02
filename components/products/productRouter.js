const express = require('express');
const router = express.Router();

const productController = require("./productController")

router.get('/add-product/',productController.add);
router.post('/store', productController.store);

router.get('/:id/edit',productController.edit);
router.post('/:id/update',productController.update);

router.post('/:id/delete',productController.delete);


router.get('/search',productController.listByName);
router.get('/', productController.list);


module.exports = router;
