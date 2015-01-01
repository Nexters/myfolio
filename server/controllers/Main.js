var BaseController = require('./Base'),
    mainModel = new (require('../models/MainModel'))(),
    sessionService = new (require('../service/SessionService'))();

function MainController() {
    if(!(this instanceof MainController)) {
        return new MainController();
    }
}

MainController.prototype = new BaseController('MainController');

MainController.prototype.run = function(req, res, next) {
    var content = {};
    var paramMap = {};
    var userSession = sessionService.getSession(req);
    var userId, userName;

    if (userSession.userId && userSession.userName) {
        content.userId = userSession.userId;
        content.userName = userSession.userName;
    }
    content.testData = "Test Data";
    mainModel.select(paramMap,function(records){
        res.render('Main.ejs',content);
    });
};

module.exports = MainController;


