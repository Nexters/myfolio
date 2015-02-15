'use strict';

var mysql = require('./db').mysql,
    pool = require('./db').pool;

function PortfolioModel() {
    if (!(this instanceof PortfolioModel)) {
        return new PortfolioModel();
    }
}


PortfolioModel.prototype.selectById = function (criteria, options, callback) {
    var sql = "SELECT PORTFOLIO_ID, PORTFOLIO_TITLE, PORTFOLIO_CONTENT_TAG, TEMPLATE_ID, USER_ID FROM PORTFOLIO_TB WHERE USER_ID=?";
    var inserts = [ criteria.USER_ID ];
    sql = mysql.format(sql, inserts);

    pool.query(sql, function (err, result) {
        callback(err, result);
    });
};

PortfolioModel.prototype.selectByName = function (criteria, options, callback) {
    var sql = "SELECT PORTFOLIO_ID, PORTFOLIO_TITLE, PORTFOLIO_CONTENT_TAG, TEMPLATE_ID, USER_ID FROM PORTFOLIO_TB WHERE USER_NAME=?";
    var inserts = [ criteria.USER_NAME ];
    sql = mysql.format(sql, inserts);

    pool.query(sql, function (err, result) {
        callback(err, result);
    });
};

PortfolioModel.prototype.insert = function (criteria, options, callback) {
    var sql = "INSERT INTO PORTFOLIO_TB (TEMPLATE_ID, USER_ID, USER_NAME) VALUES (?,?,?);";
    var inserts = [ criteria.TEMPLATE_ID, criteria.USER_ID, criteria.USER_NAME ];
    sql = mysql.format(sql, inserts);

    pool.query(sql, function (err, result) {
        callback(err, result);
    });
};

PortfolioModel.prototype.update = function (criteria, options, callback) {
    // TODO: 여기에 유저 포트폴리오 데이터 업데이트 하는 코드 추가
};

module.exports = PortfolioModel;


