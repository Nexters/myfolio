'use strict';

var express = require('express');
var router = express.Router();
var mainController = new (require('../controllers/Main'))();
var portfolioController = new (require('../controllers/Portfolio'))();

/* GET main page */
router.get('/', mainController.run);

/* GET user portfolio page */
router.get('/:id', portfolioController.getUserPortfolio);

module.exports = router;
