// General
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
// Relocate resources
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
// Handlebars precompilation
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
// Rollup + Babel
const rollup = require('rollup-stream');
const babel = require('rollup-plugin-babel');
const source = require('vinyl-source-stream');
const rollupUglify = require('rollup-plugin-uglify');

gulp.task('rollup', function () {
  return rollup({
    entry: './src/js/app.js',
    format: 'iife',
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['es2015-rollup']
      }),
      rollupUglify()
    ],
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest('./dist/'));
});

// Clean dist
gulp.task('clean', () => {
  return gulp.src('dist/', {
    read: false
  }).pipe(clean());
});
// Copy assets folder
gulp.task('copy-assets', () => {
  return gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('dist/assets/'));
});
// Copy html files
gulp.task('copy-html', () => {
  return gulp.src(['src/index.html', 'src/.htaccess'])
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
// Concat vendor files
gulp.task('concat-vendor', () => {
  return gulp.src([
    'src/js/vendor/jquery-3.2.1.min.js',
    'src/js/vendor/chosen.jquery.min.js',
    'src/js/vendor/handlebars-v4.0.10.js',
  ]).pipe(concat('vendor.js')).pipe(gulp.dest('dist/'));
});
// Handlebars
gulp.task('precompile', () => {
  gulp.src('src/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Handlebars.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

// Register tasks
gulp.task('build', (callback) => {
  runSequence('clean', ['copy-assets', 'copy-html', 'concat-vendor', 'sass', 'precompile'], 'rollup', callback);
});

// Watchers
gulp.task('watch', ['build'], () => {
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/assets/**/*.*', ['copy-assets']);
  gulp.watch('src/*.html', ['copy-html']);
  gulp.watch('src/js/*.js', ['rollup']);
  gulp.watch('src/js/vendor/**/*.js', ['concat-vendor']);
  gulp.watch('src/templates/*.hbs', ['precompile']);
});