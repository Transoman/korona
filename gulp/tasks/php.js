module.exports = function () {
  $.gulp.task('php', () => {
    return $.gulp.src('./app/*.php')
      .pipe($.gulp.dest('./build/'));
  });
};