const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');

// Clean dist
gulp.task('clean', () => {
  return gulp.src('dist/', {
    read: false
  }).pipe(clean());
});

// Copy files
gulp.task('copy-assets', () => {
  return gulp.src(['assets/**/*'])
    .pipe(gulp.dest('dist/assets/'));
});
gulp.task('copy-index', () => {
  return gulp.src(['index.html'])
    .pipe(gulp.dest('dist/'));
});

// Compile sass
gulp.task('sass', () => {
  return gulp.src('src/styles/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});

// Concat js
gulp.task('concat-js', () => {
  return gulp.src([
    'src/js/sidebar.js',
    'src/js/app.js'
  ]).pipe(concat('app.js')).pipe(gulp.dest('dist/'));
});

// Concat vendor
gulp.task('concat-vendor', () => {
  return gulp.src([
    'src/js/vendor/**/*.js',
  ]).pipe(concat('vendor.js')).pipe(gulp.dest('dist/'));
});

// Babel
gulp.task('babel', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});


// Register tasks
gulp.task('build', (callback) => {
  runSequence('clean', ['copy-assets', 'copy-index', 'sass'], 'babel', callback);
});
gulp.task('babel-concat', (callback) => {
  runSequence(['concat-js', 'concat-vendor'], 'babel', callback);
});

// Watchers
gulp.task('watch', () => {
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/assets/**/*.*', ['copy-assets', 'copy-index']);
  gulp.watch('src/js/**/*.js', ['babel-concat']);
});