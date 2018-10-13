/* eslint-disable arrow-body-style */
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const files = {
  projectSources: [
    'src/**/*.js',
  ],
};

gulp.task('jsUglify', () => {
  return gulp.src(files.projectSources)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});
