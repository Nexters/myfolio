'use strict';

var portfolioModel = new (require('../models/PortfolioModel'))(),
    path = require('path'),
    fs = require('fs'),
    async = require('async');

function PortfoiloService() {
    if (!(this instanceof PortfoiloService)) {
        return new PortfoiloService();
    }
}

PortfoiloService.prototype.getUserPortfolioData = function (params, callback) {
    var criteria = {
        USER_NAME: params.userName
    };
    var options = {};
    var result = {};

    portfolioModel.selectByName(criteria, options, function (err, portfolio) {
        result = portfolio;
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
            portfolioModel.selectById(criteria, options, function (err, portfolio) {
                if (portfolio && portfolio.length > 0) {
                    callback({
                        code: 0,
                        msg: "Already have portfolio!"
                    });
                    return;
                }
                callback(err);
            });
        },
        function (callback) {
            criteria = {
                TEMPLATE_ID: params.templateId,
                USER_ID: params.userId,
                USER_NAME: params.userName
            };
            portfolioModel.insert(criteria, options, function (err) {
                callback(err);
            });
        },
        function (callback) {
            criteria = {
                USER_ID: params.userId
            };
            portfolioModel.selectById(criteria, options, function (err, portfolio) {
                callback(err, portfolio);
            });
        },
        function (portfolio, callback) {
            // templateFileName: 템플릿 이름.ejs
            // saveFileName: 포트폴리오 이름.ejs
            // srcPath: 템플릿 경로
            // savPath: 포트폴리어 저장되는 경로
            var templateFileName = 'template' + params.templateId + '.ejs';
            var saveFileName = portfolio[0].PORTFOLIO_ID + '.ejs';
            var srcPath = path.join(__dirname, '../views/template/', templateFileName);
            var savPath = path.join(__dirname, '../views/portfolio/', saveFileName);
            fs.readFile(srcPath, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                //Do your processing, MD5, send a satellite to the moon, etc.
                fs.writeFile (savPath, data, function(err) {
                    if (err) throw err;
                    console.log('complete');
                    callback(null, {
                        code: 1,
                        msg: "success"
                    });
                });
            });
        }
    ], function (err, state) {
        if (err && err.code === 0) {
            result = err;
            err = null;
        } else {
            result = state;
        }
        callback(err, result);
    });
};

module.exports = PortfoiloService;