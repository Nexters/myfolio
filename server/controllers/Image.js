'use strict';

var BaseController = require('./Base'),
    path = require('path'),
    fs = require('fs');

function ImageController() {
    if (!(this instanceof ImageController)) {
        return new ImageController();
    }
}

ImageController.prototype = new BaseController('ImageController');

ImageController.prototype.getImage = function (req, res) {
    var imageName = req.params.name;
    var imagePath = path.join(__dirname, '../upload', imageName);

    res.sendFile(imagePath);
};

module.exports = ImageController;


