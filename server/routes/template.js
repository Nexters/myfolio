'use strict';

var express = require('express');
var router = express.Router();
var templateController = new (require('../controllers/Template'))();

/* GET template page */
router.get('/name/:name', templateController.run);

/* GET start page */
router.get('/start', templateController.start);

/* GET template select page */
router.get('/select', templateController.select);

module.exports = router;
