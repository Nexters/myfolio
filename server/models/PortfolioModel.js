'use strict';

var mysql = require('./db').mysql,
    pool = require('./db').pool;

function PortfolioModel() {
    if (!(this instanceof PortfolioModel)) {
        return new PortfolioModel();
    }
}

PortfolioModel.prototype.selectOne = function (criteria, options, callback) {
    var sql = "SELECT PORTFOLIO_ID, PORTFOLIO_TITLE, PORTFOLIO_CONTENT_TAG, USER_ID FROM PORTFOLIO_TB WHERE USER_ID=?";
    var inserts = [ criteria.ID ];
    sql = mysql.format(sql, inserts);

    pool.query(sql, function (err, rows, fields) {
        callback(err, rows);
    });
};

PortfolioModel.prototype.update = function (criteria, options, callback) {
    // TODO: 여기에 유저 포트폴리오 데이터 업데이트 하는 코드 추가
};

module.exports = PortfolioModel;


