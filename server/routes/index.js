'use strict';

var express = require('express');
var router = express.Router();
var mainController = new (require('../controllers/Main'))();
var portfolioController = new (require('../controllers/Portfolio'))();

/* Disable Cache */
router.get('/*', function(req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

/* GET main page */
router
    .get('/', mainController.run);

/* GET user portfolio page */
router
    .get('/:name', portfolioController.getUserPortfolio);

module.exports = router;
