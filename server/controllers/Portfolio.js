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
    if (!sessionService.hasSession(req) || !sessionService.hasUserAuthority(req)) {
        res.render('401.ejs');
        return;
    }

    params.userId = req.params.id;

    portfolioService.getUserPortfolioData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
            return;
        }

        if (!result || result.length === 0) {
            res.redirect('/');
            return;
        }
        // TODO: 여기에 유저 포트폴리오 데이터 가져와서 클라이언트로 내려주는 코드 추가
        // TODO: html로 내려줘야함! (result.PORTFOLIO_CONTENT_TAG)
        // TODO: 내 포트폴리오 페이지이면 에디터 바 표시

        res.status(200).send(result);
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
