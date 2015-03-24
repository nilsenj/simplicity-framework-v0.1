/*
 simplicity-framework Boilerplate build
 *
 */

// Grab node packages
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

// Compile Coffeescript
gulp.task('coffeescript', function () {
  return gulp.src('assets/coffeescripts/*.coffee')
      .pipe($.plumber())
      .pipe($.coffee())
      .pipe(gulp.dest('assets/javascripts/'))
      .pipe($.connect.reload());
});

// Lint JS
gulp.task('lint', function () {
  return gulp.src('assets/javascripts/**/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('default'));
});
//Connect
gulp.task('connect', function () {
  $.connect.server({
    root: 'dist',
    livereload: true,
    port: 8001
  });

});

gulp.task('html', function () {
  gulp.src('dist/*.html')
      .pipe($.connect.reload());
});

// Concatenate & Minify JS
gulp.task('script-modules', function () {
  return gulp.src(['assets/javascripts/modules/*.js'])
      .pipe($.plumber())
      .pipe($.concat('modules.js'))
      .pipe(gulp.dest('dist/javascripts'))
      .pipe($.rename('modules.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('dist/javascripts'))
      .pipe($.connect.reload());
});

// Concatenate & Minify JS
gulp.task('add-scripts', function () {
  return gulp.src(['assets/javascripts/*.js'])
      .pipe($.plumber())
      .pipe($.uglify())
      .pipe(gulp.dest('dist/javascripts'))
      .pipe($.connect.reload());
});

gulp.task('sass', function() {
  return gulp.src(['assets/stylesheets/*.scss'])
      .pipe($.plumber())
      .pipe($.rubySass())
      .pipe(gulp.dest('dist/stylesheets/'))
      .pipe($.connect.reload());
});

gulp.task('autoprefix', function () {
  return gulp.src('dist/stylesheets/*.css')
      .pipe($.plumber())
      .pipe($.autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: true
      }))
      .pipe(gulp.dest('dist/stylesheets/'));
});
gulp.task('minify-css', function () {
  return gulp.src('dist/stylesheets/*.css')
      .pipe($.plumber())
      .pipe($.minifyCss({
        keepBreaks: true
      }))
      .pipe($.autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: true
      }))
      .pipe(gulp.dest('dist/stylesheets/'))
      .pipe($.connect.reload());
});

// Watch Files For Changes
gulp.task('watch', function () {

  gulp.watch(['dist/*.html'], ['html']);
  gulp.watch('assets/javascripts/modules/*.js', ['script-modules']);
  gulp.watch('assets/javascripts/*.js', ['add-scripts']);
  gulp.watch(['assets/stylesheets/*.scss'], ['sass']);
  gulp.watch(['assets/stylesheets/**/*.scss'], ['sass']);
  gulp.watch('dist/stylesheets/**/*.css', ['minify-css']);

});
// Default Task
gulp.task('default', [ 'connect', 'html', 'sass' ,'minify-css','coffeescript','add-scripts', 'script-modules', 'watch']);
