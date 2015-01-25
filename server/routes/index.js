'use strict';

var express = require('express');
var router = express.Router();
var mainController = new (require('../controllers/Main'))();
var portfolioController = new (require('../controllers/Portfolio'))();
var aboutusController = new(require('../controllers/Aboutus'))();

/* GET main page. */
router.get('/', mainController.run);

/* GET user portfolio page */
router.get('/:id', portfolioController.getUserPortfolio);

router.get('/aboutus', aboutusController.aboutus);


module.exports = router;
