var BaseController = require("./Base");
    //model = new (require("../models/MainModel"));

var MainController = new BaseController("MainController");

MainController.run = function(req, res, next) {
    var self = this;
    self.content = {testData: "Test Data"};
    res.render('Main.ejs',self.content);
};

module.exports = MainController;


