var BaseController = require('./Base'),
    sessionService = new (require('../service/SessionService'))(),
    path = require('path'),
    os = require('os'),
    Busboy = require('busboy');

function UploadController() {
    if(!(this instanceof UploadController)) {
        return new UploadController();
    }
}

UploadController.prototype = new BaseController('UploadController');

UploadController.prototype.checkFileSize = function (fileSize) {
    return function (req, res, next) {
        if (sessionService.hasSession(req)) {
            res.status(550).send({
                code: 0,
                msg: "Need to login!"
            });
        }
        if (parseInt(req.headers['content-length']) > fileSize) {
            res.status(400).send({
                code: 0,
                msg: "File size error!"
            });
        } else {
            next();
        }
    }
};

UploadController.prototype.run = function(req, res, next) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
    });
    res.writeHead(404);
    res.end();
    return req.pipe(busboy);
};


module.exports = UploadController;


