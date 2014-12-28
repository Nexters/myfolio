var express = require('express');
var router = express.Router();
var mainController = require('../controllers/Main');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('main', { title: 'Express' });
});

module.exports = router;
