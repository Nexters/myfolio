var express = require('express');
var router = express.Router();
var mainController = new (require('../controllers/Main'))();


/* GET main page. */
router.get('/', mainController.run);
router.get('/test',mainController.testRun);

module.exports = router;
