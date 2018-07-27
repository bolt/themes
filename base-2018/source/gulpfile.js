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
  sass: [
    'node_modules',
  ]
};

var javascriptFiles = [
    'javascript/app.js',
    'node_modules/baguettebox.js/src/baguetteBox.js',
    'node_modules/prismjs/prism.js',
    'node_modules/prismjs/components/prism-php.js',
    'node_modules/prismjs/components/prism-json.js',
    'node_modules/prismjs/components/prism-yaml.js',
    'node_modules/prismjs/components/prism-bash.js',
    'node_modules/prismjs/components/prism-markup-templating.js',
    'node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js',
    'node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js'
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
  return gulp.src(javascriptFiles)
    .pipe($.if(PRODUCTION, $.uglify()))
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('../js'));
});

gulp.task('setproduction', function(done) {
  PRODUCTION = true;
  done();
});

// Set up 'default' task, with watches.
gulp.task('default', gulp.series(gulp.parallel('compress', 'bulma-sass', 'theme-sass'), function watch() {
  gulp.watch(['scss/**/*.scss'], gulp.series('theme-sass', 'bulma-sass'));
  gulp.watch(['javascript/**/*.js'], gulp.series('compress'));
}));

// Set up 'build' task, without watches and force 'production'.
gulp.task('build', gulp.series(gulp.parallel('setproduction', 'compress', 'bulma-sass', 'theme-sass')));

