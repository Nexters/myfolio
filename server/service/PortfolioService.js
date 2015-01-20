'use strict';

var portfolioModel = new (require('../models/PortfolioModel'))(),
    imageService = new (require('./ImageService'))(),
    async = require('async');

function PortfoiloService() {
    if (!(this instanceof PortfoiloService)) {
        return new PortfoiloService();
    }
}

PortfoiloService.prototype.getUserPortfolioData = function (params, callback) {
    var criteria = {};
    var options = {};
    var result = {};

    portfolioModel.selectOne(criteria, options, function (err, portfolio) {
        result.portfolio = portfolio;
        callback(err, result);
    });
};

module.exports = PortfoiloService;