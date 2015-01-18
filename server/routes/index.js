var express = require('express');
var router = express.Router();
var mainController = new (require('../controllers/Main'))();
var portfolioController = new (require('../controllers/Portfolio'))();


/* GET main page. */
router.get('/', mainController.run);

/* GET portfolio edit page */
router.get('/edit/:id', portfolioController.edit);

module.exports = router;
