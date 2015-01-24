'use strict';

var BaseController = require('./Base'),
    userService = new (require('../service/UserService'))(),
    sessionService = new (require('../service/SessionService'))(),
    crypto = require('crypto');

var CRYPTO_SALT = "myfolio";

function UserController() {
    if (!(this instanceof UserController)) {
        return new UserController();
    }
}

UserController.prototype = new BaseController('UserController');

UserController.prototype.getUsers = function (req, res) {
    var params = {};

    userService.getUsers(params, function (err, result) {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).send(result);
    });
};

UserController.prototype.checkId = function (req, res) {
    var params = {
        id: req.params.id
    };

    userService.checkId(params, function (err, result) {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).send(result);
    });
};

UserController.prototype.checkName = function (req, res) {
    var params = {
        name: req.params.name
    };

    userService.checkName(params, function (err, result) {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).send(result);
    });
};

UserController.prototype.join = function (req, res) {
    var params = {
        id: req.body.id,
        pw: crypto.createHmac('sha1', CRYPTO_SALT).update(req.body.pw).digest('hex'),
        name: req.body.name
    };

    userService.joinUser(params, function (err, result) {
        if (err) {
            res.status(404).send(err);
            return;
        }
        sessionService.registerSession(req, params.id, params.name, null);
        res.status(200).send(result);
    });
};

UserController.prototype.login = function (req, res) {
    var params = {
        id: req.body.id,
        pw: crypto.createHmac('sha1', CRYPTO_SALT).update(req.body.pw).digest('hex')
    };

    userService.loginUser(params, function (err, result) {
        if (err) {
            res.status(404).send(err);
            return;
        }
        if (result.code === 1) {
            sessionService.registerSession(req, result.data.USER_ID, result.data.USER_NAME, result.data.USER_PORTFOLIO_ID);
        }
        res.status(200).send(result);
    });
};

UserController.prototype.logout = function (req, res) {
    if (!sessionService.hasSession(req)) {
        res.status(400).send({
            code: 0,
            msg: "not login"
        });
        return;
    }
    sessionService.removeSession(req);
    res.status(200).send({
        code: 1,
        msg: "logout success"
    });
};

module.exports = UserController;


