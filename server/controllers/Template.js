'use strict';

var BaseController = require('./Base'),
    mainService = new (require('../service/MainService'))(),
    portfolioService = new (require('../service/PortfolioService'))(),
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
    var params = {};
    var content = {};

    if (!sessionService.hasSession(req)) {
        res.redirect('/template/select');
        return;
    }

    sessionService.makeUserSessionData(req, content);

    params.userName = content.userName;

    portfolioService.getUserPortfolioData(params, function (err, result) {
        if (err) {
            res.render('404.ejs', err);
            return;
        }
        // 유저 포트폴리오가 없을 때 템플릿 선택 페이지 보여줌
        if (!result || result.length === 0) {
            res.redirect('/template/select');
            return;
        }
        // 유저 포트폴리오 있을 때 유저의 포트폴리오 페이지로 이동
        res.redirect('/' + content.userName);
    });
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
