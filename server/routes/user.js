var express = require('express');
var router = express.Router();
var userController = new (require('../controllers/User'))();

/* GET user listing. */

router.route('/')
    .get(userController.getUsers);

router.route('/join')
    .post(userController.join);

router.route('/login')
    .post(userController.login);

module.exports = router;

