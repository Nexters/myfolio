'use strict';

var _ = require('underscore');

function BaseController(name) {
    this.name = name;
}

BaseController.prototype.run = function (req, res, next) {

};

BaseController.prototype.extend = function (child) {
    return _.extend({}, this, child);
};

module.exports = BaseController;