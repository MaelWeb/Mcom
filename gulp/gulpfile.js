var gulp = require('gulp');
var minify = require('gulp-minify-css');
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  less: "../less/*.less",
  js:'../js',
  css: '../css',
  scripts:'../script/*.js',
};

gulp.task('css', function () {
  gulp.src('../less/*.less')
      .pipe(less())
      // .pipe(minify())
      .pipe(gulp.dest(paths.css));
});

gulp.task('js', function () {
   gulp.src(paths.scripts)
    // .pipe(uglify())
    .pipe(concat("component.js"))
    .pipe(gulp.dest(paths.js));
});


// 监听任务，指定路径的文件变化后触发
gulp.task('watch', function() {
  gulp.watch(paths.less, ['css']);
  gulp.watch(paths.scripts, ['js']);
});

// 默认任务（运行gulp以后触发）
gulp.task('default', ['css', 'js', 'watch']);
