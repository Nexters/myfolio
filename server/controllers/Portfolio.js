var BaseController = require('./Base'),
    portfolioService = new (require('../service/PortfolioService')),
    sessionService = new (require('../service/SessionService'))(),
    _ = require('underscore');

function PortfolioController() {
    if(!(this instanceof PortfolioController)) {
        return new PortfolioController();
    }
}

PortfolioController.prototype = new BaseController('PortfolioController');

PortfolioController.prototype.edit = function(req, res, next) {
    var params = {};
    var content = {};
    var userSession;

    if (sessionService.hasSession(req)) {
        userSession = sessionService.getSession(req);
        content.userId = userSession.userId;
        content.userName = userSession.userName;
    }
    portfolioService.getUserPortfolioData(params, function(err, result) {
        _.extend(content, result);
        // TODO: 여기에 유저 포트폴리오 데이터 가져와서 클라이언트로 내려주는 코드 추가
    });
};

module.exports = PortfolioController;


