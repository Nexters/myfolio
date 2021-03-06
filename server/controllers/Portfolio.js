'use strict';

var BaseController = require('./Base'),
    portfolioService = new (require('../service/PortfolioService'))(),
    sessionService = new (require('../service/SessionService'))(),
    path = require('path'),
    fs = require('fs'),
    _ = require('underscore'),
    ejs = require('ejs');

function PortfolioController() {
    if (!(this instanceof PortfolioController)) {
        return new PortfolioController();
    }
}

PortfolioController.prototype = new BaseController('PortfolioController');

PortfolioController.prototype.getUserPortfolio = function (req, res, next) {
    var params = {};
    var content = {};
    var isOwner = false;
    var filePath;
    var addedScript, portfolioFile;

    params.userName = req.params.name;

    if (sessionService.hasSession(req) && sessionService.hasUserAuthorityByName(req, params.userName)) {
        isOwner = true;
    }

    portfolioService.getUserPortfolioData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
            return;
        }

        if (!result || result.length === 0) {
            res.redirect('/');
            return;
        }
    
        portfolioFile = result[0].PORTFOLIO_ID + '.ejs';
        filePath = path.join(__dirname, '../views/portfolio/', portfolioFile);
        
        content.isOwner = isOwner;  // isOwner: 유저 자신의 페이지인지 확인
        content.portfolioId = result[0].PORTFOLIO_ID;   // portfolioId: 포트폴리오 ID 설정
        content.filename = filePath;
        
        fs.readFile(filePath, 'utf-8', function (err, portfolioData) {
            if (err) {
               res.render('404.ejs', err);
               return;
            }
            addedScript = "<script>var g_isOwner = '<%= isOwner %>'</script>";
            portfolioData = addedScript + portfolioData;
            res.end(ejs.render(portfolioData, content));
        });
    });
};

PortfolioController.prototype.makeUserPortfolio = function (req, res) {
    var params = {};

    if (!sessionService.hasSession(req)) {
        res.render('401.ejs');
        return;
    }
    params.templateId = req.params.template;
    params.userId = req.session.userId;
    params.userName = req.session.userName;

    portfolioService.makeUserPortfolioData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
            return;
        }

        result.userName = req.session.userName;
        res.status(200).send(result);
    });
};

PortfolioController.prototype.saveUserPortfolio = function (req, res) {
    var params = {};

    params.portfolioId = req.params.id;
    params.html = req.body.html;

    portfolioService.saveUserPortfolioData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
            return;
        }
        res.status(200).send({
            code: 1,
            msg: "save success"
        });
    });

};

module.exports = PortfolioController;
