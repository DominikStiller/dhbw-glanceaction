/* eslint-disable arrow-body-style */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify-es').default;
const clean = require('gulp-clean');
const jsdoc = require('gulp-jsdoc3');
const config = require('./.jsdoc.json');

const files = {
  projectSources: [
    'src/**/*.js',
  ],
  buildFiles: [
    'build/**/*.js',
  ],
};

gulp.task('lintSources', () => {
  return gulp.src(files.projectSources)
    .pipe(eslint({ configFile: '.eslintrc.json' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('minifySources', () => {
  return gulp.src(files.projectSources)
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task('cleanBuild', () => {
  return gulp.src('./build', { read: false })
    .pipe(clean());
});

gulp.task('createDocumentation', (cb) => {
  gulp.src(files.projectSources, { read: false })
    .pipe(jsdoc(config, cb));
});
