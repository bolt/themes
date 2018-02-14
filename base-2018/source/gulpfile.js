var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var argv = require('yargs').argv;

// Check for --production flag
var PRODUCTION = !!(argv.production);

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// Define base paths for Sass and Javascript.
// File paths to various assets are defined here.
var PATHS = {
  //assets: [
  //  'src/assets/**/*',
  //  '!src/assets/{img,js,scss}/**/*'
  //],
  sass: [
    'node_modules',
  ],
  javascript: [
    'src/assets/js/**/!(app).js',
    'src/assets/js/app.js'
  ]
};

var javascriptFiles = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
];

// Compile Foundation Sass into CSS. In production, the CSS is compressed
gulp.task('bulma-sass', function() {

    return gulp.src('scss/bulma.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        includePaths: PATHS.sass
      })
        .on('error', $.sass.logError))
      .pipe($.autoprefixer({
        browsers: COMPATIBILITY
      }))
      .pipe($.if(PRODUCTION, $.cssnano()))
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
      .pipe(gulp.dest('../css'));
  });

// Compile Theme Sass into CSS. Not compressed.
gulp.task('theme-sass', function() {

    return gulp.src('scss/theme.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        includePaths: PATHS.sass
      })
        .on('error', $.sass.logError))
      .pipe($.autoprefixer({
        browsers: COMPATIBILITY
      }))
      // If you _do_ want to compress this file on 'production', uncomment the the lines below.
      .pipe($.if(PRODUCTION, $.cssnano()))
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
      .pipe(gulp.dest('../css'));
  });

// Set up 'compress' task.
gulp.task('compress', function() {
  return gulp.src('javascript/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('../js'));
});


gulp.task('copyjavascript', function() {
   gulp.src(javascriptFiles)
   .pipe($.uglify())
   .pipe(gulp.dest('javascript'));
});


// Set up 'default' task, with watches.
gulp.task('default', ['copyjavascript', 'compress', 'bulma-sass', 'theme-sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['theme-sass', 'bulma-sass']);
  gulp.watch(['javascript/**/*.js'], ['compress']);
});

// Build
gulp.task('build', ['copyjavascript', 'compress', 'bulma-sass', 'theme-sass']);

