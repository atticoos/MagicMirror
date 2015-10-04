var gulp = require('gulp'),
    less = require('gulp-less'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify');

gulp.task('less', function () {
  gulp.src('src/less/main.less')
  .pipe(less())
  .pipe(gulp.dest('dist/'));
});

gulp.task('font', function () {
  gulp.src('src/less/fonts/*')
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('browserify', function () {
  gulp.src('src/index.jsx')
  .pipe(browserify({
    transform: [reactify],
    insertGlobals: true
  }))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('vendor', function () {
  gulp.src([
    'bower_components/promise-polyfill/Promise.js',
    'bower_components/fetch/fetch.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  gulp.src('src/index.html')
  .pipe(gulp.dest('dist/'));
})

gulp.task('js', ['browserify', 'vendor']);
gulp.task('build', ['js', 'less', 'html']);

gulp.task('watch', ['build'], function () {
  gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['browserify']);
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/index.html', ['html']);
});
