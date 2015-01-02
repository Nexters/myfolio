var express = require('express');
var router = express.Router();
var mainController = require('../controllers/Main')();


/* GET main page. */
router.get('/', mainController.run);
router.get('/aa', mainController.runaa);
module.exports = router;

