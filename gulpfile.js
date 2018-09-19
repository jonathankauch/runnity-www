var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    $               = require('gulp-load-plugins')(),
    del             = require('del'),
    runSequence     = require('run-sequence'),
    merge           = require('merge-stream'),
    eslint          = require('gulp-eslint');

var eslintObject    = {
    "ecmaFeatures": {},
    "parser": "espree",
    "env": {
        "browser": false,
        "node": false,
        "amd": false,
        "mocha": false,
        "jasmine": false
    },

    "rules": {
        "no-alert": 2,
        "no-array-constructor": 2,
        "no-bitwise": 0,
        "no-caller": 2,
        "no-catch-shadow": 2,
        "no-comma-dangle": 0,
        "no-cond-assign": 2,
        "no-console": 2,
        "no-constant-condition": 2,
        "no-control-regex": 2,
        "no-debugger": 2,
        "no-delete-var": 2,
        "no-div-regex": 0,
        "no-dupe-keys": 2,
        "no-dupe-args": 2,
        "no-duplicate-case": 2,
        "no-else-return": 0,
        "no-empty": 2,
        "no-eq-null": 0,
        "no-eval": 2,
        "no-ex-assign": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-extra-boolean-cast": 2,
        "no-extra-parens": 0,
        "no-extra-semi": 2,
        "no-fallthrough": 2,
        "no-floating-decimal": 0,
        "no-func-assign": 2,
        "no-implied-eval": 2,
        "no-inline-comments": 0,
        "no-inner-declarations": [2, "functions"],
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-iterator": 2,
        "no-label-var": 2,
        "no-labels": 2,
        "no-lone-blocks": 2,
        "no-lonely-if": 0,
        "no-loop-func": 2,
        "no-mixed-requires": [0, false],
        "no-mixed-spaces-and-tabs": [2, false],
        "no-multi-spaces": 2,
        "no-multi-str": 2,
        "no-multiple-empty-lines": [2, {"max": 1}],
        "no-native-reassign": 2,
        "no-negated-in-lhs": 2,
        "no-nested-ternary": 0,
        "no-new": 0,
        "no-new-func": 2,
        "no-new-object": 2,
        "no-new-require": 0,
        "no-new-wrappers": 2,
        "no-obj-calls": 2,
        "no-octal": 0,
        "no-octal-escape": 2,
        "no-param-reassign": 0,
        "no-path-concat": 0,
        "no-plusplus": 0,
        "no-process-env": 0,
        "no-process-exit": 2,
        "no-proto": 2,
        "no-redeclare": 2,
        "no-regex-spaces": 2,
        "no-reserved-keys": 0,
        "no-restricted-modules": 0,
        "no-return-assign": 2,
        "no-script-url": 2,
        "no-self-compare": 0,
        "no-sequences": 2,
        "no-shadow": 0,
        "no-shadow-restricted-names": 2,
        "no-space-before-semi": 0,
        "no-spaced-func": 2,
        "no-sparse-arrays": 2,
        "no-sync": 0,
        "no-ternary": 0,
        "no-trailing-spaces": 2,
        "no-throw-literal": 0,
        "no-undef": 0,
        "no-undef-init": 2,
        "no-undefined": 0,
        "no-underscore-dangle": 0,
        "no-unreachable": 2,
        "no-unused-expressions": 2,
        "no-unused-vars": [2, {"vars": "local", "args": "after-used"}],
        "no-use-before-define": 0,
        "no-void": 0,
        "no-var": 0,
        "no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],
        "no-with": 2,
        "block-scoped-var": 0,
        "brace-style": [0, "1tbs"],
        "camelcase": 0,
        "comma-dangle": [2, "never"],
        "comma-spacing": 2,
        "comma-style": 0,
        "complexity": [0, 11],
        "consistent-return": 2,
        "consistent-this": [0, "that"],
        "curly": [2, "all"],
        "default-case": 0,
        "dot-notation": [0, { "allowKeywords": true }],
        "eol-last": 2,
        "eqeqeq": 2,
        "func-names": 0,
        "func-style": [0, "declaration"],
        "generator-star": 0,
        "generator-star-spacing": 0,
        "guard-for-in": 0,
        "handle-callback-err": 0,
        "indent": [2, 2],
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "max-depth": [0, 4],
        "max-len": [0, 80, 4],
        "max-nested-callbacks": [0, 2],
        "max-params": [1, 5],
        "max-statements": [1, 25],
        "new-cap": 2,
        "new-parens": 2,
        "newline-after-var": 0,
        "one-var": 0,
        "operator-assignment": [0, "always"],
        "padded-blocks": 0,
        "quote-props": 0,
        "quotes": [2, "single"],
        "radix": 0,
        "semi": 2,
        "semi-spacing": [2, {"before": false, "after": true}],
        "sort-vars": 0,
        "space-after-function-name": [0, "never"],
        "space-after-keywords": [0, "always"],
        "space-before-blocks": [0, "always"],
        "space-before-function-paren": [0, "always"],
        "space-before-function-parentheses": [0, "always"],
        "space-in-brackets": [0, "never"],
        "space-in-parens": [0, "never"],
        "space-infix-ops": 2,
        "space-unary-ops": [2, { "words": true, "nonwords": false }],
        "spaced-line-comment": [0, "always"],
        "strict": 0,
        "use-isnan": 2,
        "valid-jsdoc": 0,
        "valid-typeof": 2,
        "vars-on-top": 0,
        "wrap-iife": 0,
        "wrap-regex": 0,
        "yoda": [2, "never"]
    },

    globals: {
      'jQuery': true,
      'app': true
    }
}

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// browser-sync for production
gulp.task('browser-sync-prod', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 80
  });
});

gulp.task('minify-js', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-cookies/angular-cookies.js',
    'node_modules/angular-messages/angular-messages.js',
    'node_modules/angular-password/angular-password.js',
    'node_modules/ng-page-title/dist/ng-page-title.js',
    'app/app.modules.js',
    'app/app.routes.js',
    'app/components/Home/HomeController.js',
    'app/components/SignUp/SignUpController.js',
    'app/components/Connection/ConnectionController.js',
    'app/components/Profile/ProfileController.js',
    'app/components/Event/EventCtrl.js',
    'app/components/Event/Event.js'
  ])
    .pipe($.concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe($.rename('all.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));
});

// minify CSS
gulp.task('minify-css', function() {
  gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'assets/css/*.css'
    ])
    .pipe($.concat('all.css'))
    .pipe($.minifyCss())
    .pipe($.rename('all.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('move_fonts', function () {
  return gulp.src('node_modules/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('dist/fonts'))
});

// start webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './'
    }
  }, done);
});

// start webserver from _build folder to check how it will look in production
gulp.task('server-build', function(done) {
  return browserSync({
    server: {
      baseDir: './bin'
    }
  }, done);
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  var sass = gulp.src(['assets/sass/*.sass'])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed'
    }))
    .on('error', $.notify.onError({
      title: 'SASS Failed',
      message: 'Error(s) occurred during compile!'
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('assets/css/'))
    .pipe(reload({
      stream: true
    }));

  var css = gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe($.concat('stand-alone.css'))
    .pipe(gulp.dest('assets/css'));

  return merge(sass, css)
    .pipe($.concat('all.min.css'))
    .pipe(gulp.dest('dist/css'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('lint', function() {
  return gulp.src([
    'app/**/*.js',
    '!node_modules/**'
  ])
  .pipe(eslint(eslintObject))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

// default task to be run with `gulp` command
// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['lint', 'minify-js', 'move_fonts', 'sass', 'browser-sync'], function() {
  gulp.watch('styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch(['app/**/*.html', 'index.html'], ['bs-reload']);
  gulp.watch(['app/*.js', 'app/components/**/*.js'], ['lint', 'bs-reload']);
  gulp.watch('assets/sass/*.sass', ['sass']);
});

// Production task to be run on server
gulp.task('prod', ['lint', 'minify-js', 'move_fonts', 'sass', 'browser-sync-prod'], function() {
  gulp.watch('styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch(['app/**/*.html', 'index.html'], ['bs-reload']);
  gulp.watch(['app/*.js', 'app/components/**/*.js'], ['lint', 'bs-reload']);
  gulp.watch('assets/sass/*.sass', ['sass']);
});
