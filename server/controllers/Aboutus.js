/**
 * Created by sa on 2015-01-22.
 */
'use strict';

var BaseController = require('./Base'),
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
    console.log('aboutus!');

    res.render('aboutus.ejs',content);
};

module.exports = AboutusController;
