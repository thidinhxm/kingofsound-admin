const express = require('express');
const router = express.Router();

const categoryController = require("./categoryController");

router.get('/add', categoryController.add);
router.post('/store', categoryController.store);

module.exports = router;