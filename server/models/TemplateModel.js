'use strict';

var mysql = require('./db').mysql,
    pool = require('./db').pool;

function TemplateModel() {
    if (!(this instanceof TemplateModel)) {
        return new TemplateModel();
    }
}

TemplateModel.prototype.selectAll = function (criteria, options, callback) {
    var query = "SELECT * FROM TEMPLATE_TB WHERE NOT TEMPLATE_ID=0";

    pool.query(query, function (err, rows, fields) {
        callback(err, rows);
    });
};

module.exports = TemplateModel;


