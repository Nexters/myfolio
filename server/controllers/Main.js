var BaseController = require('./Base'),
    mainService = new (require('../service/MainService')),
    sessionService = new (require('../service/SessionService'))(),
    _ = require('underscore');

function MainController() {
    if(!(this instanceof MainController)) {
        return new MainController();
    }
}

MainController.prototype = new BaseController('MainController');

MainController.prototype.run = function(req, res, next) {
    var params = {};
    var content = {};
    var userSession;

    sessionService.makeUserSessionData(req, content);

    if (sessionService.hasSession(req)) {
        userSession = sessionService.getSession(req);
        content.userId = userSession.userId;
        content.userName = userSession.userName;
    }
    mainService.getMainData(params, function(err, result) {
        _.extend(content, result);
        res.render('Main.ejs',content);
    });
};

module.exports = MainController;


