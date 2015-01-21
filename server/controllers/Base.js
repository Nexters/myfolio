'use strict';

var _ = require('underscore');

function BaseController(name) {
    this.name = name;
}

BaseController.prototype = {
    extend: function (child) {
        return _.extend({}, this, child);
    },
    run: function (req, res, next) {

    }
};

module.exports = BaseController;