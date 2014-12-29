var BaseController = require("./Base");
    //model = new (require("../models/MainModel"));

function MainController() {
    if(!(this instanceof MainController)) {
        return new MainController();
    }
}

MainController.prototype = new BaseController("MainController");

MainController.prototype.run = function(req, res, next) {
    var self = this;
    self.content = {testData: "Test Data"};
    res.render('Main.ejs',self.content);
};


module.exports = MainController;


