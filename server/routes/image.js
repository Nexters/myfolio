'use strict';

var express = require('express');
var router = express.Router();
var imageController = new (require('../controllers/Image'))();


/** POST file upload **/
router.route('/:name')
    .get(imageController.getImage);

module.exports = router;
