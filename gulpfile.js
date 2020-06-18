'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('sass', function () {
  return gulp
    .src('./src/sass/styles.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});
