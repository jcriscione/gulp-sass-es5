const path = require('path')

const tasks = (gulp, options, plugins) => {
  gulp.task('js:dev', () => {
    return gulp.src(path.join(options.root, 'js/app/**/*.js'))
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(options.dest, 'js')))
  })
  gulp.task('js:lib', () => {
    return gulp.src(path.join(options.root, 'js/lib/**/*.js'))
    .pipe(gulp.dest(path.join(options.dest, 'js')))
  })

  gulp.task('js:prod', () => {
    return gulp.src(path.join(options.root, 'js/app/**/*.js'))
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(options.dest, 'js')))
  })
}

module.exports = tasks