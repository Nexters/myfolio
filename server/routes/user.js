'use strict';

var express = require('express');
var router = express.Router();
var userController = new (require('../controllers/User'))();

/* GET user listing. */
router.route('/')
    .get(userController.getUsers);

/* POST user check id */
router.route('/check/id/:id')
    .post(userController.checkId);

/* POST user check name */
router.route('/check/name/:name')
    .post(userController.checkName);

/* POST user join */
router.route('/join')
    .post(userController.join);

/* POST user login */
router.route('/login')
    .post(userController.login);

/* POST user logout */
router.route('/logout')
    .post(userController.logout);

module.exports = router;
