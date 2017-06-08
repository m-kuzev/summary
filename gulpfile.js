const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const concat = require('gulp-concat');

gulp.task('clean', () => {
  return gulp.src('dist/', {
    read: false
  }).pipe(clean());
});

// Copy files
gulp.task('copy-assets', () => {
  gulp.src(['assets/**/*'])
    .pipe(gulp.dest('dist/assets/'));
});
gulp.task('copy-index', () => {
  gulp.src(['index.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', () => {
  gulp.src('src/styles/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});

// Concat js
gulp.task('concat-js', () => {
  return gulp.src([
    'src/js/app.js',
  ]).pipe(concat('app.js')).pipe(gulp.dest('dist/'));
});

// Concat vendor
gulp.task('concat-vendor', () => {
  return gulp.src([
    'src/js/',
  ]).pipe(concat('vendor.js')).pipe(gulp.dest('dist/'));
});

gulp.task('sass:watch', ['sass'], () => {
  gulp.watch('./src/styles/*.scss', ['sass']);
});

// Register tasks
gulp.task('build', ['copy-index', 'copy-assets', 'sass']);
