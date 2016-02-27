/*
  https://gist.github.com/danharper/3ca2273125f500429945
*/

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
