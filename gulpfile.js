'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('sass', function () {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss');
});