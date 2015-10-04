var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('less', function () {
  gulp.src('src/less/main.less')
  .pipe(less())
  .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['less']);
