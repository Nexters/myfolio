var BaseController = require("./Base"),
    userService = new (require("../service/UserService"))();

function UserController() {
    if(!(this instanceof UserController)) {
        return new UserController();
    }
}

UserController.prototype = new BaseController("UserController");

UserController.prototype.getUsers = function(req, res, next) {
    var params = {};

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
        pw: req.body.pw,
        name: req.body.name ? req.body.name : null
    };

    userService.insertUser(params, function(err, result){
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).send(result);
    });
};

module.exports = UserController;


