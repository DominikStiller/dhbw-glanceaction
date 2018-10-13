/* eslint-disable arrow-body-style */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify-es').default;

const files = {
  projectSources: [
    'src/**/*.js',
  ],
};

gulp.task('lintSources', () => {
  return gulp.src(files.projectSources)
    .pipe(eslint({ configFile: '.eslintrc.json' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('minify', () => {
  return gulp.src(files.projectSources)
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
