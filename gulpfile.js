const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('default', function () {

});


// Clean dist
gulp.task('clean', () => {
  return gulp.src('dist/', {
    read: false
  }).pipe(clean());
});

// Copy files
gulp.task('copy-assets', () => {
  return gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('dist/assets/'));
});
gulp.task('copy-html', () => {
  return gulp.src(['src/index.html'])
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

// Concat vendor
gulp.task('concat-vendor', () => {
  return gulp.src([
    'src/js/vendor/jquery-3.2.1.min.js',
    'src/js/vendor/chosen.jquery.min.js',
    'src/js/vendor/handlebars-v4.0.10.js',
  ]).pipe(concat('vendor.js')).pipe(gulp.dest('dist/'));
});

// Babel
gulp.task('babel', () => {
  return browserify()
    .require('src/js/app.js', {
      entry: true,
      extensions: ['.js'],
      debug: true
    })
    .transform(babelify, {
      presets: ['es2015']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist'));
});


// Register tasks
gulp.task('build', (callback) => {
  runSequence('clean', ['copy-assets', 'copy-html', 'concat-vendor', 'sass'], 'babel', callback);
});

// Watchers
gulp.task('watch', () => {
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/assets/**/*.*', ['copy-assets']);
  gulp.watch('src/*.html', ['copy-html']);
  gulp.watch('src/js/*.js', ['babel']);
  gulp.watch('src/templates/**/*.hbs', ['babel']);
  gulp.watch('src/js/vendor/**/*.js', ['concat-vendor']);
});