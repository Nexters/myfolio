'use strict';

var BaseController = require('./Base'),
    mainService = new (require('../service/MainService'))(),
    sessionService = new (require('../service/SessionService'))(),
    _ = require('underscore');

function TemplateController() {
    if (!(this instanceof TemplateController)) {
        return new TemplateController();
    }
}

TemplateController.prototype = new BaseController('TemplateController');

TemplateController.prototype.run = function (req, res) {
    var params = {},
        content = {};

    sessionService.makeUserSessionData(req, content);

    mainService.getMainData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
        }
        _.extend(content, result);
        res.render('SelectTemplate.ejs', content);
    });
};

module.exports = TemplateController;
