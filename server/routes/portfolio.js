'use strict';

var express = require('express');
var router = express.Router();
var portfolioController = new (require('../controllers/Portfolio'))();

/* POST make portfolio */
router.post('/template/:template', portfolioController.makeUserPortfolio);


module.exports = router;
