/**
 * Created by sa on 2015-01-22.
 */
'use strict';

var BaseController = require('./Base'),
    mainService = new (require('../service/MainService'))(),
    sessionService = new (require('../service/SessionService'))(),
    _ = require('underscore');

function AboutusController() {
    if (!(this instanceof AboutusController)) {
        return new AboutusController();
    }
}

AboutusController.prototype = new BaseController('AboutusController');

AboutusController.prototype.aboutus = function (req, res) {
    var params = {},
        content = {};

    sessionService.makeUserSessionData(req, content);

    mainService.getMainData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
        }
        _.extend(content, result);
        res.render('Aboutus.ejs', content);
    });
};

module.exports = AboutusController;
