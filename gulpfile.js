'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['build', 'watch']);

gulp.task('build', ['scripts', 'sass']);

gulp.task('scripts', function () {
    gulp.src([
        'src/vendor/jquery/dist/jquery.js',
        'src/vendor/bootstrap/dist/js/bootstrap.js',
        'src/vendor/angular/angular.js',
        'src/vendor/angular-route/angular-route.js',
        'src/vendor/angular-animate/angular-animate.js',
        'src/js/*.js'
    ], {base: 'src/'})
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/dist/js/'));
});

gulp.task('sass', function () {
    //copy the required Bootstrap font to dist/
    gulp.src(
        'src/vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
    )
    .pipe(plumber())
    .pipe(gulp.dest('src/dist/fonts'));

    gulp.src([
        'src/vendor/bootstrap/dist/css/bootstrap.css',
        'src/css/*.scss'
    ], {base: 'src/'})
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('src/dist/css/'));
});


gulp.task('watch', function () {
    gulp.watch(['src/js/*.js', 'src/js/config.json'], ['scripts']);
    gulp.watch('src/css/*.scss', ['sass']);
});
