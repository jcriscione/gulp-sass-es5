const path = require('path')
const browserSync = require('browser-sync')
const sequence = require('run-sequence')

const tasks = (gulp, options, plugins) => {

  const watch = plugins.watch
  let bs

  gulp.task('serve:dev', (done) => {
    bs = browserSync.init({
      server: options.dest,
      middleware: options.gulpMem.middleware
    })
    done()
  })

  gulp.task('reload:styles', () => {
    return bs.reload(path.join(options.dest, 'css/main.css'))
  })

  gulp.task('reload:js', () => {
    return bs.reload(path.join(options.dest, 'js/main.js'))
  })
  gulp.task('reload:js:lib', () => {
    return bs.reload(path.join(options.dest, 'js/app/lib.js'))
  })

  gulp.task('reload:images', () => {
    return bs.reload(path.join(options.dest, 'img/**/*.*'))
  })

  gulp.task('reload:static', () => {
    return bs.reload(path.join(options.dest, 'static/**/*.*'))
  })

  gulp.task('reload:html', () => {
    return bs.reload(path.join(options.dest, '**/*.html'))
  })

  gulp.task('watch', (done) => {
    watch('js/app/**/*.js', () => {
      sequence('js:dev', 'reload:js')
    })
    watch('js/lib/**/*.js', () => {
      sequence('js:lib', 'reload:js:lib')
    })
    watch('styles/**/*.scss', () => {
      sequence('styles:dev', 'reload:styles')
    })
    watch('img/**/*.*', (file) => {
      sequence('images:dev', 'reload:images')
    })
    watch('static/**/*.*', (file) => {
      sequence('static', 'reload:static')
    })
    watch('**/*.html', (file) => {
      sequence('html', 'reload:html')
    })
    done()
  })
}

module.exports = tasks