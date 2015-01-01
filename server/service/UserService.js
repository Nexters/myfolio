var userModel = new (require("../models/UserModel"))();

function UserService() {
    if(!(this instanceof UserService)) {
        return new UserService();
    }
}

UserService.prototype.getUsers = function(params, callback) {
    var criteria = {};
    var options = {};

    userModel.select(criteria, options, function(err, result) {
        callback(err, result);
    });
};


UserService.prototype.insertUser = function(params, callback) {
    var criteria = {
        ID: params.id,
        PW: params.pw,
        NAME: params.name
    };
    var options = {};

    userModel.insert(criteria, options, function(err, result) {
        callback(err, result);
    });
};

module.exports = UserService;


