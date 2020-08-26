const { src, dest, series, parallel, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const bundleBuilder = require('gulp-bem-bundle-builder');
const bundlerFs = require('gulp-bem-bundler-fs');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const debug = require('gulp-debug');
const del = require('del');
const flatten = require('gulp-flatten');
const gulpIf = require('gulp-if');
const gulpOneOf = require('gulp-one-of');
const imagemin = require('gulp-imagemin');
const include = require('gulp-include');
const notify = require('gulp-notify');
const nunjucks = require('gulp-nunjucks-html');
const postcss = require('gulp-postcss');
const postcssColorFunction = require('postcss-color-function');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssReporter = require('postcss-reporter');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssUrl = require('postcss-url');
const posthtml = require('gulp-posthtml');
const posthtmlAltAlways = require('posthtml-alt-always');
const posthtmlMinifier = require('posthtml-minifier');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const typograf = require('gulp-typograf');
const uglify = require('gulp-uglify-es').default;
const vinylFtp = require('vinyl-ftp');

const config = require('./config');
const ftpConfig = require('./ftp');

const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const builder = bundleBuilder(config.builder);

// Styles
function bemCss() {
  return bundlerFs(config.bundles + '/*')
    .pipe(
      builder({
        css: bundle =>
          bundle
            .src('css')
            .pipe(gulpOneOf())
            .pipe(gulpIf(isDevelopment, sourcemaps.init()))
            .pipe(
              postcss(
                [
                  postcssImport(),
                  postcssSimpleVars(),
                  postcssNested,
                  postcssColorFunction,
                  postcssUrl({
                    url: isDevelopment ? 'copy' : 'inline',
                  }),
                  autoprefixer({
                    add: !isDevelopment,
                  }),
                  postcssReporter(),
                ],
                {
                  to: config.dest + '/' + bundle.name + '.css',
                }
              )
            )
            .on(
              'error',
              notify.onError(function(err) {
                return {
                  title: 'PostCSS',
                  message: err.message,
                  sound: 'Blow',
                };
              })
            )
            .pipe(concat(bundle.name + '.css'))
            .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
            .pipe(gulpIf(!isDevelopment, csso())),
      })
    )
    .pipe(debug({ title: 'bemCss:' }))
    .pipe(dest(config.dest));
}

// Scripts
function bemJs() {
  return bundlerFs(config.bundles + '/*')
    .pipe(
      builder({
        js: bundle =>
          bundle
            .src('js')
            .pipe(gulpIf(isDevelopment, sourcemaps.init()))
            .pipe(
              include({
                includePaths: [__dirname + '/node_modules', __dirname + '/.'],
              })
            )
            .pipe(concat(bundle.name + '.js'))
            .pipe(
              babel({
                presets: ['@babel/preset-env'],
              })
            )
            .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
            .pipe(gulpIf(!isDevelopment, uglify())),
      })
    )
    .pipe(debug({ title: 'bemJs:' }))
    .pipe(dest(config.dest));
}

// Images
function bemImage() {
  return bundlerFs(config.bundles + '/*')
    .pipe(
      builder({
        image: bundle =>
          bundle
            .src('image')
            .pipe(gulpIf(!isDevelopment, imagemin()))
            .pipe(flatten()),
      })
    )
    .pipe(debug({ title: 'bemImage:' }))
    .pipe(dest(config.dest + '/' + config.assets));
}

// HTML
function buildHtml() {
  return src(config.pages + '/**/*.html')
    .pipe(
      nunjucks({
        searchPaths: ['./'],
      })
    )
    .on(
      'error',
      notify.onError(function(err) {
        return {
          title: 'Nunjucks',
          message: err.message,
          sound: 'Blow',
        };
      })
    )
    .pipe(
      typograf({
        locale: ['ru', 'en-US'],
        mode: 'digit',
      })
    )
    .pipe(
      gulpIf(
        !isDevelopment,
        posthtml([
          posthtmlAltAlways(),
          posthtmlMinifier({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
          }),
          // TODO: inlineSVG
        ])
      )
    )
    .pipe(flatten())
    .pipe(debug({ title: 'buildHtml:' }))
    .pipe(dest(config.dest));
}

// Assets
function buildAssets() {
  return src(config.assets + '/**/*.*')
    .pipe(debug({ title: 'buildAssets:' }))
    .pipe(dest(config.dest));
}

// Clean
function clean() {
  return del(config.dest + '/*');
}

// Watch
function watcher(cb) {
  watch(
    [config.blocks + '/**/*.deps.js', config.bundles + '/**/*.bemdecl.js'],
    parallel(bemCss, bemJs, bemImage)
  );

  watch(
    [config.pages + '/**/*.html', config.templates + '/**/*.html'],
    series(buildHtml)
  );

  watch(config.blocks + '/**/*.css', series(bemCss));

  watch(config.assets + '/**/*.*', series(buildAssets));

  watch(
    [config.blocks + '/**/*.js', '!' + config.blocks + '/**/*.deps.js'],
    series(bemJs)
  );

  watch(config.blocks + '/**/*.+(png|jpg|svg)', parallel(bemCss, bemImage));

  cb();
}

// Server
function serve(cb) {
  browserSync.init({
    server: config.dest,
    port: isDevelopment ? 3000 : 8080,
    notify: false,
    open: false,
    ui: false,
    tunnel: false,
  });

  browserSync
    .watch([
      config.dest + '/**/*.*',
      '!' + config.dest + '/**/*.+(css|css.map)',
    ])
    .on('change', browserSync.reload);

  browserSync.watch(config.dest + '/**/*.css', function(event, file) {
    if (event === 'change') {
      browserSync.reload(config.dest + '/**/*.css');
    }
  });

  cb();
}

exports.serve = serve;

// FTP
function ftp() {
  var conn = vinylFtp.create(ftpConfig);
  return src(config.dest + '/**', { buffer: false })
    .pipe(conn.newer(ftpConfig.path))
    .pipe(conn.dest(ftpConfig.path));
}

exports.ftp = ftp;

// Build
exports.build = series(
  clean,
  parallel(bemCss, bemJs, bemImage, buildHtml, buildAssets)
);

// Develop
exports.default = series(
  clean,
  parallel(bemCss, bemJs, bemImage, buildHtml, buildAssets),
  parallel(watcher, serve)
);
