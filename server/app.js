var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var user = require('./routes/user');
var upload = require('./routes/upload');

var config = require('./config/index');
var MongoStore;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Session
if (app.get('env') === 'production') {
    MongoStore = require('connect-mongo')(session);
    app.use(session({
        secret: 'myfolio-session',
        store: new MongoStore({ url: 'mongodb://localhost:27017/myfolio' }),
        resave: false,
        saveUninitialized: true
    }));
} else {
    app.use(session({
        secret: 'myfolio-session',
        resave: false,
        saveUninitialized: true
    }));
}


app.use('/', routes);
app.use('/user', user);
app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'local') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
