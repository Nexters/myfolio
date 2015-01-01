var BaseController = require('./Base'),
    userService = new (require('../service/UserService'))(),
    sessionService = new (require('../service/SessionService'))(),
    bcrypt = require('bcrypt');

var salt = bcrypt.genSaltSync(10);

function UserController() {
    if(!(this instanceof UserController)) {
        return new UserController();
    }
}

UserController.prototype = new BaseController('UserController');

UserController.prototype.getUsers = function(req, res, next) {
    var params = {};

    console.log(sessionService.getSession(req));
    userService.getUsers(params, function(err, result){
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).send(result);
    });
};

UserController.prototype.join = function(req, res, next) {
    var params = {
        id: req.body.id,
        pw: bcrypt.hashSync(req.body.pw, salt),
        name: (typeof req.body.name !== "undefined") ? req.body.name : null
    };

    userService.joinUser(params, function(err, result){
        if (err) {
            res.status(404).send(err);
            return;
        }
        sessionService.registerSession(req, params.id, params.name);
        res.status(200).send(result);
    });
};

UserController.prototype.login = function(req, res, next) {
    var params = {
        id: req.body.id,
        pw: bcrypt.hashSync(req.body.pw, salt)
    };

    userService.loginUser(params, function(err, result){
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).send(result);
    });
};


module.exports = UserController;


