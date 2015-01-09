var BaseController = require('./Base'),
    sessionService = new (require('../service/SessionService'))(),
    path = require('path'),
    fs = require('fs'),
    Busboy = require('busboy');

function UploadController() {
    if(!(this instanceof UploadController)) {
        return new UploadController();
    }
}

UploadController.prototype = new BaseController('UploadController');

UploadController.prototype.checkFileSize = function (fileSize) {
    return function (req, res, next) {
        // TODO: 로그인 한 이용자만 이미지 업로드 할 수 있도록!! 주석 풀어야함!!
        //if (!sessionService.hasSession(req)) {
        //    res.status(550).send({
        //        code: 0,
        //        msg: "Need to login!"
        //    });
        //}
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
    var savedFileName, saveTo;
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        savedFileName = new Date().getTime() + "_" + filename;
        saveTo = path.join(__dirname, '../upload', savedFileName);
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        console.log("SAVE PATH:",saveTo);
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        res.set('Content-type', 'text/html; charset=utf-8');
        res.writeHead(200, { 'Connection': 'close' });
        res.write(JSON.stringify(savedFileName));
        res.end();
    });
    return req.pipe(busboy);
};


module.exports = UploadController;


