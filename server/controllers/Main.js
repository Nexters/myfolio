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

    sessionService.makeUserSessionData(req, content);

    mainService.getMainData(params, function(err, result) {
        _.extend(content, result);
        res.render('Main.ejs',content);
    });
};

module.exports = MainController;


