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
                // 유저 포트폴리오가 이미 존재할 때 에러로 리턴
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
<<<<<<< HEAD
            // TODO: 여기에 템플릿 html 가져와서 content_tag에 저장하는 코드 추가
            callback(null, {
                code: 1,

                msg: "success!"
=======
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
                    callback(err, null);
                    return;
                }
                fs.writeFile (savPath, data, function(err) {
                    callback(err, {
                        code: 1,
                        msg: "success"
                    });
                });
>>>>>>> origin/dev
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

PortfoiloService.prototype.saveUserPortfolioData = function (params, callback) {
    var portfolioFileName = params.portfolioId + '.ejs';
    var savPath = path.join(__dirname, '../views/portfolio/', portfolioFileName);
    var data = params.html;
    fs.writeFile (savPath, data, function(err) {
        callback(err, {
            code: 1,
            msg: "success"
        });
    });
};



module.exports = PortfoiloService;