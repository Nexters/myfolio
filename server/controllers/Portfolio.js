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
    // TODO: 여기에 유저 포트폴리오 보여주는 페이지 작업

    if (!sessionService.makeUserSessionData(req, content) || !sessionService.hasUserAuthority(req)) {
        // TODO: 로그인 안했거나 다른 사람 포트폴리오 저장 안되도록 401.ejs 표시
        res.render('401.ejs');
        return;
    }

    params.userId = req.params.id;
    params.portfolioId = req.params.portfolio;

    // TODO: 유저ID에 해당하는 포트폴리오 있을경우 포트폴리오 데이터 가져와서 수정하는 페이지 보여줌
    // TODO: 아닐경우 타이틀에 해당하는 포트폴리오 템플릿 선택 페이지 보여줌
    portfolioService.getUserPortfolioData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
        }
        // TODO: 여기에 유저 포트폴리오 데이터 가져와서 클라이언트로 내려주는 코드 추가
    });
};

PortfolioController.prototype.makeUserPortfolio = function (req, res) {
    //TODO: 템플릿에 해당하는 유저 포트폴리오 만들어주어야함!
    var params = {},
        content = {};

    if (!sessionService.hasSession(req)) {
        // TODO: 로그인 안했을 때
        console.log("401 error");
        res.render('401.ejs');
        return;
    }

    params.templateId = req.params.template;
    params.userId = req.session.userId;

    portfolioService.makeUserPortfolioData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
        }
        res.status(200).send({
            code: 1,
            result: {
                userName: req.session.userName
            }
        });
    });
};

PortfolioController.prototype.saveUserPortfolio = function (req, res) {
    var params = {},
        content = {};

    // TODO: 유저 포트폴리오 저장하는 코드 필요
};

module.exports = PortfolioController;


