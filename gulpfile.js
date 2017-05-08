const autoprefixer = require('gulp-autoprefixer')
const browserify = require('browserify')
const browserSync = require('browser-sync').create()
const buffer = require('vinyl-buffer')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')
const source = require('vinyl-source-stream')
const uglify = require('gulp-uglify')

gulp.task('css', () => gulp.src('src/css/styles.scss')
  .pipe(sass({
    includePaths: [
      'node_modules/normalize-scss/sass'
    ],
    outputStyle: 'compressed'
  })
  .on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: [ 'last 2 versions', 'ie >= 11' ]
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream())
)

gulp.task('js', () => browserify('src/js/scripts.js')
  .bundle()
  .on('error', function (err) {
    console.error(err)
    this.emit('end')
  })
  .pipe(source('scripts.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('js'))
  .pipe(browserSync.reload({ stream: true }))
)

gulp.task('img', () => gulp.src('src/img/**')
  .pipe(imagemin())
  .pipe(gulp.dest('img'))
)

gulp.task('build', [ 'css', 'js', 'img' ])

gulp.task('watch', [ 'build' ], () => {
  browserSync.init({ proxy: 'statamic-theme.dev', notify: false })
  gulp.watch('src/css/**/*.scss', [ 'css' ])
  gulp.watch('src/js/**/*.js', [ 'js' ])
  gulp.watch('src/img/**', [ 'img' ])
  gulp.watch([
    'layouts/**/*',
    'partials/**/*',
    'templates/**/*'
  ], () => {
    browserSync.reload()
  })
})

gulp.task('default', [ 'watch' ])
