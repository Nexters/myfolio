'use strict';

var portfolioModel = new (require('../models/PortfolioModel'))(),
    async = require('async');

function PortfoiloService() {
    if (!(this instanceof PortfoiloService)) {
        return new PortfoiloService();
    }
}

PortfoiloService.prototype.getUserPortfolioData = function (params, callback) {
    var criteria = {
        USER_ID: params.userId
    };
    var options = {};
    var result = {};

    portfolioModel.selectOne(criteria, options, function (err, portfolio) {
        result.portfolio = portfolio;
        callback(err, result);
    });
};

PortfoiloService.prototype.makeUserPortfolioData = function (params, callback) {
    var criteria = {};
    var options = {};
    var result = {};

    async.waterfall([
        function (callback) {
            criteria = {
                USER_ID: params.userId
            };
            portfolioModel.selectOne(criteria, options, function (err, portfolio) {
                if (portfolio) {
                    callback({
                        code: 0,
                        msg: "Already have portfolio!"
                    });
                }
            });
        },
        function (callback) {
            criteria = {
                TEMPLATE_ID: params.templateId,
                USER_ID: params.userId
            };
            portfolioModel.insert(criteria, options, function (err) {
                callback(err);
            });
        },
        function (callback) {
            criteria = {
                USER_ID: params.userId
            };
            portfolioModel.selectOne(criteria, options, function (err, portfolio) {
                callback(err, portfolio);
            });
        },
        function (portfolio, callback) {
            // TODO: 여기에 템플릿 html 가져와서 content_tag에 저장하는 코드 추가
            callback(null, {
                code: 1,
                msg: "success!"
            });
        }
    ], function (err, state) {
        if (err && err.code === 0) {
            result = err;
        } else {
            result = state;
        }
        callback(err, result);
    });
};

module.exports = PortfoiloService;