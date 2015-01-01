var userModel = new (require('../models/UserModel'))();
var async = require('async');

function UserService() {
    if(!(this instanceof UserService)) {
        return new UserService();
    }
}

UserService.prototype.getUsers = function(params, callback) {
    var criteria = {};
    var options = {};

    userModel.selectAll(criteria, options, function(err, result) {
        callback(err, result);
    });
};

UserService.prototype.joinUser = function(params, callback) {
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

UserService.prototype.loginUser = function(params, callback) {
    var criteria = {
        ID: params.id,
        PW: params.pw
    };
    var options = {};

    async.waterfall([
        function(callback){
            userModel.selectOne(criteria, options, function(err, user) {
                callback(err, user);
            });
        },
        function(user, callback){
            var result = {};
            if (!user || user.length === 0) {
                result = {
                    code: 0,
                    msg: "login fail"
                };
            } else {
                result = {
                    code: 1,
                    msg: "login success"
                };
            }
            callback(null, result);
        }
        // TODO: 여기에 유저 포트폴리오 정보 가져오는 부분 추가해야함!
    ], function (err, result) {
        callback(err, result);
    });

};

module.exports = UserService;


