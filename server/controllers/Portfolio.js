'use strict';

var BaseController = require('./Base'),
    portfolioService = new (require('../service/PortfolioService'))(),
    sessionService = new (require('../service/SessionService'))(),
    _ = require('underscore');

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
    var portfolioFile;

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

        content.isOwner = isOwner;
        console.log(content);
        portfolioFile = 'portfolio/' + result[0].PORTFOLIO_ID + '.ejs';

        res.render(portfolioFile, content);
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
    var params = {},
        content = {};

    // TODO: 유저 포트폴리오 저장하는 코드 필요

};

module.exports = PortfolioController;
