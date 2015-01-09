var express = require('express');
var router = express.Router();
var uploadController = new (require('../controllers/Upload'))();

var FILE_UPLOAD_LIMIT_SIZE = 100 * 1024 * 1024;

/** POST file upload **/
router.route('/')
    .post(uploadController.checkFileSize(FILE_UPLOAD_LIMIT_SIZE), uploadController.run);

module.exports = router;
