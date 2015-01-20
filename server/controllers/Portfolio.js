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

PortfolioController.prototype.getPortfolio = function (req, res, next) {
    // TODO: 여기에 유저 포트폴리오 보여주는 페이지 작업
};

PortfolioController.prototype.makePortfolio = function (req, res, next) {
    // TODO: 여기에 템플릿 선택한 후 포트폴리오 만드는 페이지 작업
};

PortfolioController.prototype.edit = function (req, res) {
    var params = {},
        content = {};

    if (!sessionService.makeUserSessionData(req, content) || !sessionService.hasUserAuthority(req)) {
        // TODO: 로그인 안했거나 다른 사람 포트폴리오 에디트 안되도록 401.ejs 표시
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
        _.extend(content, result);
        // TODO: 여기에 유저 포트폴리오 데이터 가져와서 클라이언트로 내려주는 코드 추가
    });
};

module.exports = PortfolioController;


