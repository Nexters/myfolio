'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
var path = require('path');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        'public/stylesheets/*.scss',
        'public/stylesheets/**/*.css'
    ])
        .pipe($.sourcemaps.init())
        .pipe($.changed('.tmp/stylesheets', {extension: '.css'}))
        .pipe($.sass({
            precision: 10,
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/stylesheets'))
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe($.size({title: 'stylesheets'}));
});

// Minify JavaScript (except vendor scripts)
gulp.task('scripts', function() {
    return gulp.src(['public/javascripts/**/*.js', '!public/javascripts/bower_components/**/*.js'])
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe(gulp.dest('dist/javascripts'))
        .pipe($.size({title: 'javascripts'}));
});

// Optimize Images
gulp.task('images', function () {
    return gulp.src('public/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size({title: 'images'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
    return gulp.src(['public/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size({title: 'fonts'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
    return gulp.src([
        'public/*',
        '!public/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'))
        .pipe($.size({title: 'copy'}));
});

// Copy bower_components Files At The Root Level (app)
gulp.task('copy-bower', function () {
    return gulp.src([
        'public/javascripts/bower_components/**/*'
    ], {
        dot: true
    }).pipe(gulp.dest('dist/javascripts/bower_components'))
        .pipe($.size({title: 'copy-bower'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
    runSequence('styles', ['scripts', 'images', 'fonts', 'copy', 'copy-bower'], cb);
});

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }