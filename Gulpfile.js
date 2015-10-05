var gulp = require('gulp'),
    less = require('gulp-less'),
    reactify = require('reactify'),
    babelify = require('babelify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    server = require('gulp-express');

gulp.task('less', function () {
  gulp.src('src/less/main.less')
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(gulp.dest('dist/'));
});

gulp.task('font', function () {
  gulp.src('src/less/fonts/*')
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('browserify', function () {
  gulp.src('src/index.jsx')
  .pipe(browserify({
    transform: [babelify],
    insertGlobals: true
  }))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('animations', function () {
  gulp.src('src/animations/**/*.js')
  .pipe(concat('animations.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('vendor', function () {
  gulp.src([
    'bower_components/promise-polyfill/Promise.js',
    'bower_components/fetch/fetch.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/lodash/lodash.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  gulp.src('src/index.html')
  .pipe(gulp.dest('dist/'));
})

gulp.task('js', ['browserify', 'vendor', 'animations']);
gulp.task('build', ['js', 'less', 'html', 'font']);

gulp.task('watch', ['build'], function () {
  gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['browserify']);
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/animations/**/*.js', ['animations']);
});
