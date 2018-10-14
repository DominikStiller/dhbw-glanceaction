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

// Task for linting all source files.
gulp.task('lintSources', () => {
  return gulp.src(files.projectSources)
    .pipe(eslint({ configFile: '.eslintrc.json' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Task for minyfying all source files.
gulp.task('minifySources', () => {
  return gulp.src(files.projectSources)
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

// Task to clean the build directory.
gulp.task('cleanBuild', () => {
  return gulp.src('./build', { read: false })
    .pipe(clean());
});

// Task to create a documentation (which is not big for the backend, but it works, and was understood).
gulp.task('createDocumentation', (cb) => {
  gulp.src(files.projectSources, { read: false })
    .pipe(jsdoc(config, cb));
});
