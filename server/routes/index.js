'use strict';

var express = require('express');
var router = express.Router();
var mainController = new (require('../controllers/Main'))();
var portfolioController = new (require('../controllers/Portfolio'))();

/* GET main page */
router
    .get('/', mainController.run);

/* GET main page. */
router.get('/', mainController.run);
router.get('/test',mainController.testRun);

/* GET user portfolio page */
router
    .get('/:name', portfolioController.getUserPortfolio);


module.exports = router;
