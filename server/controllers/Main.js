'use strict';

var BaseController = require('./Base'),
    mainService = new (require('../service/MainService'))(),
    sessionService = new (require('../service/SessionService'))(),
    _ = require('underscore');

function MainController() {
    if (!(this instanceof MainController)) {
        return new MainController();
    }
}

MainController.prototype = new BaseController('MainController');

MainController.prototype.run = function (req, res) {
    var params = {},
        content = {};

    if (userSession.userId && userSession.userName) {
        content.userId = userSession.userId;
        content.userName = userSession.userName;
    }
    content.testData = "https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/1610824_723370901081964_932966085397901495_n.jpg?oh=0e0a934ad37e0751e8f3ad4bb92cf830&oe=5541BA1E&__gda__=1428706847_75112487e4d56f853c38cb96c6153581";
    mainModel.select(paramMap,function(records){
        res.render('Main.ejs',content);
    sessionService.makeUserSessionData(req, content);

    mainService.getMainData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
        }
        _.extend(content, result);
        res.render('Main.ejs', content);
    });
})
}

MainController.prototype.testRun = function(req,res,next){
    var content = {};
    var paramMap = {};

    content.test = "test pineoc page";
    res.render('test.ejs',content);
};

module.exports = MainController;
