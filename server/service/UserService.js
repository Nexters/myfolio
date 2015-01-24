'use strict';

var userModel = new (require('../models/UserModel'))(),
    async = require('async');

function UserService() {
    if (!(this instanceof UserService)) {
        return new UserService();
    }
}

UserService.prototype.getUsers = function (params, callback) {
    var criteria = {};
    var options = {};

    userModel.selectAll(criteria, options, function (err, result) {
        callback(err, result);
    });
};

UserService.prototype.checkId = function (params, callback) {
    var criteria = {
        ID: params.id
    };
    var options = {};
    var result;

    userModel.selectById(criteria, options, function (err, user) {
        if (user && user.length > 0) {
            result = {
                code: 0,
                msg: "Not available id."
            };
            callback(err, result);
            return;
        }
        result = {
            code: 1,
            msg: "Available"
        };
        callback(err, result);
    });
};

UserService.prototype.checkName = function (params, callback) {
    var criteria = {
        NAME: params.name
    };
    var options = {};
    var result;

    userModel.selectByName(criteria, options, function (err, user) {
        if (user && user.length > 0) {
            result = {
                code: 0,
                msg: "Not available name."
            };
            callback(err, result);
            return;
        }
        result = {
            code: 1,
            msg: "Available"
        };
        callback(err, result);
    });
};

UserService.prototype.joinUser = function (params, callback) {
    var criteria = {
        ID: params.id,
        PW: params.pw,
        NAME: params.name
    };
    var options = {};

    // TODO: userId, userName 체크 후 저장 필요
    userModel.insert(criteria, options, function (err, result) {
        callback(err, result);
    });
};

UserService.prototype.loginUser = function (params, callback) {
    var criteria = {
        ID: params.id,
        PW: params.pw
    };
    var options = {};

    async.waterfall([
        function (callback) {
            userModel.selectByUser(criteria, options, function (err, user) {
                callback(err, user);
            });
        },
        function (user, callback) {
            var result = {};
            if (!user || user.length === 0) {
                result = {
                    code: 0,
                    msg: "login fail"
                };
            } else {
                result = {
                    code: 1,
                    msg: "login success",
                    data: user[0]
                };
                result.userName = user[0].USER_NAME;//이름 추가해서 NAV에 나올수 있게.
            }
            callback(null, result);
        }
        // TODO: 여기에 유저 포트폴리오 정보 가져오는 부분 추가해야함!
    ], function (err, result) {
        callback(err, result);
    });
};

module.exports = UserService;


