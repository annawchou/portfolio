var gulp = require('gulp');
var less = require('gulp-less');
var shell = require('gulp-shell');
var path = require('path');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      plugins: [/*cleancss*/]
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('static', shell.task([
  'static'
]));

gulp.task('default', ['watch', 'less', 'static']);