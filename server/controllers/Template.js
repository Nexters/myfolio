'use strict';

var BaseController = require('./Base'),
    mainService = new (require('../service/MainService'))(),
    sessionService = new (require('../service/SessionService'))(),

    fs = require('fs'),

    _ = require('underscore');

function TemplateController() {
    if (!(this instanceof TemplateController)) {
        return new TemplateController();
    }
}

TemplateController.prototype = new BaseController('TemplateController');

TemplateController.prototype.run = function (req, res) {
    var templateName = req.params.name;
    var templatePath = 'template/' + templateName + '.ejs';

    // TODO: Toolbar test 위해 표시. 삭제해야됨
    var content = {
        portfolioId: 1,
        isOwner: true
    };

    res.render(templatePath, content);
};

TemplateController.prototype.start = function (req, res) {
    var content = {};

    if (!sessionService.hasSession(req)) {
        res.redirect('/template/select');
        return;
    }

    sessionService.makeUserSessionData(req, content);

    if (content.portfolioId) {
        res.redirect('/' + content.userId);
        return;
    }
    res.redirect('/template/select');
};

TemplateController.prototype.select = function (req, res) {
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
