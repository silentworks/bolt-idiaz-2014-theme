var gulp = require('gulp');
var sass = require('gulp-sass');
var exec = require('child_process').exec;
var pkg = require('./package.json');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('gulp-browserify');

var env = process.env.NODE_ENV || 'development';

var banner = ['/**',
    ' * <%= pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1).toLowerCase() %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' * @author <%= pkg.author.name %>',
    ' * Copyright (c) <%= date.getFullYear() %>',
    ' * Build date <%= date.toGMTString() %>',
    ' */',
    ''].join('\n');

var paths = {
    twigDir: '**/*.twig',
    scss: 'scss/**/*.scss',
    production: 'dist/'
};

var config = {
    sass: {
        includePaths: []
    }
};

gulp.task('server', function (next) {
    browserSync({
        proxy: "bolt2.app",
        notify: false,
        online: true,
        open: 'external'
    });
});

gulp.task('sass', function () {
    if (env === 'development') {

    }

    if (env === 'production') {
        config.sass.outputStyle = 'compressed';
    }

    return gulp.src('scss/site.scss')
        .pipe(sass(config.sass))
        .pipe(gulp.dest('css'));
        //.pipe(reload({stream:true}));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', function () {
    var path = require('path');

    /* watch html */
    gulp.watch(paths.twigDir).on('change', function(file) {
        console.log('File changed: ' + path.relative('.', file.path));
        reload();
    });

    /* watch scss */
    gulp.watch(paths.scss, ['sass']).on('change', function (file) {
        console.log('File changed: ' + path.relative('.', file.path));
        reload();
    });
});

gulp.task('build', ['sass']);
gulp.task('default', ['watch', 'server']);
