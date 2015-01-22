'use strict';

var express = require('express');
var router = express.Router();
var mainController = new (require('../controllers/Main'))();
var portfolioController = new (require('../controllers/Portfolio'))();
var aboutusController = new(require('../controllers/Aboutus'))();

/* GET main page. */
router.get('/', mainController.run);

/* GET portfolio select page */
router.get('/portfolio/select', portfolioController.getAllPortfolio);

/* GET user portfolio page */
router.get('/user/:id', portfolioController.getUserPortfolio);

/* GET make portfolio page */
router.get('/user/:id/make/:template', portfolioController.makeUserPortfolio);

/* GET portfolio edit page */
router.get('/user/:id/edit/:portfolio', portfolioController.editUserPortfolio);

router.get('/aboutus',aboutusController.aboutus);


module.exports = router;
