var express = require('express');
var router = express.Router();
var mainController = new (require('../controllers/Main'))();
var portfolioController = new (require('../controllers/Portfolio'))();


/* GET main page. */
router.get('/', mainController.run);

/* GET User Portfolio Page */
router.get('/user/:id', portfolioController.getPortfolio);

/* GET make portfolio page */
router.get('/user/:id/make/:template', portfolioController.makePortfolio);

/* GET portfolio edit page */
router.get('/user/:id/edit/:portfolio', portfolioController.edit);

module.exports = router;
