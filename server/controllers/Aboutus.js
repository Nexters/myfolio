/**
 * Created by Administrator on 15. 1. 22.
 */
var BaseController = require('./Base'),
    _ = require('underscore');

function AboutusController() {
    if (!(this instanceof AboutusController)) {
        return new AboutusController();
    }
}

AboutusController.prototype = new BaseController('AboutusController');

AboutusController.prototype.run = function (req, res) {
    var params = {},
        content = {};
    sessionService.makeUserSessionData(req, content);

    mainService.getMainData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
        }
        _.extend(content, result);
        res.render('Main.ejs', content);
    });
};

module.exports = AboutusController;