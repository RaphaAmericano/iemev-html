'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var concatCss = require('gulp-concat');

gulp.task('sass', function () {
  //return gulp.src('./sass/**/*.scss')
  return gulp.src('./scss/style.scss')
    .pipe(sass({
      includePaths: [
        'node_modules',
        '/node_modules/bootstrap/scss/bootstrap.scss']
    }).on('error', sass.logError))
    .pipe(concatCss('style.css'))
    //.pipe(cleanCss())
    .pipe(gulp.dest('./css'))
});

gulp.task('bootstrap-sass', function() {
  //return gulp.src('./css/app.scss')
  return gulp.src('node_modules/bootstrap-sass/assets/stylesheets/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./css'));
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  })
});

gulp.task('sass:watch',['browserSync', 'sass'], function () {
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('./sass/*.scss', browserSync.reload);

});