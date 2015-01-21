'use strict';

function ImageService() {
    if (!(this instanceof ImageService)) {
        return new ImageService();
    }
}

ImageService.prototype.makeTemplateThumbImage = function (templateObj) {
    var title = templateObj.TEMPLATE_TITLE;
    if (!title) {
        return;
    }
    templateObj.THUMB_IMG = "thumb_" + title + ".png";
};

module.exports = ImageService;

