'use strict';

var templateModel = new (require('../models/TemplateModel'))(),
    imageService = new (require('./ImageService'))(),
    async = require('async');

function MainService() {
    if (!(this instanceof MainService)) {
        return new MainService();
    }
}

MainService.prototype.getMainData = function (params, callback) {
    var criteria = {};
    var options = {};
    var result = {};
    var i;

    templateModel.selectAll(criteria, options, function (err, templates) {
        if (!templates) {
            templates = [];
        }
        for (i = 0; i < templates.length; i++) {
            imageService.makeTemplateThumbImage(templates[i]);
        }
        result.templates = templates;
        callback(err, result);
    });
};

module.exports = MainService;


