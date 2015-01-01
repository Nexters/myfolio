var userModel = new (require("../models/UserModel"))();

function UserService() {
    if(!(this instanceof UserService)) {
        return new UserService();
    }
}

UserService.prototype.getUsers = function(paramMap, callback) {
    var criteria = {};
    var options = {};

    userModel.select(criteria, options, function(err, result) {
        callback(err, result);
    });
};


UserService.prototype.insertUser = function(paramMap, callback) {
    var criteria = {
        ID: paramMap.id,
        PW: paramMap.pw,
        NAME: paramMap.name
    };
    var options = {};

    userModel.insert(criteria, options, function(err, result) {
        callback(err, result);
    });
};

module.exports = UserService;


