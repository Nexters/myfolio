var BaseController = require("./Base");
    //model = new (require("../models/MainModel"));

var MainController = new BaseController("MainController");

MainController.prototype.run = function(req, res, next) {
    var self = this;
    self.getContent(function() {
       res.render('Main.ejs',self.content); 
    });
};

MainController.prototype.getContent = function(callback) {
    var self = this;
    self.content = {testData: "Test Data"};
};

module.exports = MainController;


