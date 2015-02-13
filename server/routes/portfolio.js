'use strict';


var express = require('express');
var router = express.Router();
var portfolioController = new (require('../controllers/Portfolio'))();


/* POST make portfolio */
router
    .post('/template/:template', portfolioController.makeUserPortfolio);


/* POST save portfolio */
router
    .post('/save/:id', portfolioController.saveUserPortfolio);


module.exports = router;
