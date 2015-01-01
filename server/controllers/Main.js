var BaseController = require("./Base"),
    mainModel = new (require("../models/MainModel"))();

function MainController() {
    if(!(this instanceof MainController)) {
        return new MainController();
    }
}

MainController.prototype = new BaseController("MainController");

MainController.prototype.run = function(req, res, next) {
    var content = {};
    var paramMap = {};

    content.testData = "Test Data";
    mainModel.select(paramMap,function(records){
        console.log(records);
        res.render('Main.ejs',content);

    });
};

module.exports = MainController;


