const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboardController');

router.get('/', dashboardController.index);

module.exports = router;
