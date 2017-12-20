# PostCSS Node Sass [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][PostCSS]
[![NPM Version](https://img.shields.io/npm/v/postcss-node-sass.svg)](https://www.npmjs.com/package/postcss-node-sass)
[![Build Status](https://travis-ci.org/arpadHegedus/postcss-node-sass.svg?branch=master)](https://travis-ci.org/arpadHegedus/postcss-node-sass)
[![BGitter Chat](https://img.shields.io/badge/chat-gitter-blue.svg)](https://gitter.im/postcss/postcss)

A [PostCSS] plugin to parse styles with [node-sass]


[PostCSS]: https://github.com/postcss/postcss
[Gulp]: https://github.com/gulpjs/gulp
[node-sass]: https://github.com/sass/node-sass

## Installation

```js
npm install postcss-node-sass
```

## Usage

After installation, you can process Sass via PostCSS like this

```js
postcss([require('postcss-node-sass')]).process(yourCSS);
```

or using [Gulp] a typical gulpfile might look like:

```js
let gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('postcss-node-sass');
gulp.task('css', () => {
    gulp.src('path/to/dev/css')
        .pipe(postcss([
            /* postcss plugins before parsing sass */
            sass()
            /* postcss plugins after parsing sass */
        ]))
        .pipe(gulp.dest('path/to/build/css'));
});

/* rest of gulp file */
```

## Options

The [Node Sass options](https://github.com/sass/node-sass#options) can be passed in to [this plugin](https://github.com/arpadHegedus/postcss-node-sass) except for `data`, `file`, `importer`, `omitSourceMapUrl`, `outFile`, `sourceMap`, `sourceMapContents` as these are handled by the plugin. Furthermore, by default the processor will use `outputStyle:'expanded'` and `indentWidth:4`.
