var express = require('express');
var router = express.Router();
var userController = new (require('../controllers/User'))();

/* GET user listing. */

router.route('/')
    .get(userController.getUsers)
    .post(userController.join);


module.exports = router;

