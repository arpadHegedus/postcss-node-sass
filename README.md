# PostCSS Node Sass [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Linux Build Status][cli-img]][cli-url]
[![Windows Build Status][win-img]][win-url]
[![Gitter Chat][git-img]][git-url]

[PostCSS Node Sass] lets you use [Node-sass] as a [PostCSS] plugin. Node-sass
is a library that provides binding for Node.js to [LibSass], the C version of
the popular stylesheet preprocessor, Sass.


```scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

:root {
  color: $primary-color;
  font: 100% $font-stack;
}

/* becomes */

:root {
  color: #333;
  font: 100% Helvetica, sans-serif; }
```

By allowing Sass preprocessing to become part of your PostCSS plugin chain,
you’ll be able to safely run transforms before and after Sass while preserving
source maps the entire way through.

## Usage

Add [PostCSS Node Sass] to your build tool:

```bash
npm install postcss-node-sass --save-dev
```

#### Node

Use [PostCSS Node Sass] to process your CSS:

```js
require('postcss-node-sass').process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Use [PostCSS Node Sass] as a plugin:

```js
postcss([
  require('postcss-node-sass')(/* Node-sass options */)
]).process(YOUR_CSS);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Node Sass] in your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('postcss-node-sass')(/* Node-sass options */)
    ])
  ).pipe(
    gulp.dest('.')
  );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Node Sass] in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('postcss-node-sass')(/* Node-sass options */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

## Options

[PostCSS Node Sass] options are [Node-sass options], except for `file`,
`outFile`, `data`, `omitSourceMapUrl`, `sourceMap`, and `sourceMapContents`,
as these must be handled by [PostCSS] and [PostCSS Node Sass].

[npm-url]: https://www.npmjs.com/package/postcss-node-sass
[npm-img]: https://img.shields.io/npm/v/postcss-node-sass.svg
[cli-url]: https://travis-ci.org/arpadHegedus/postcss-node-sass
[cli-img]: https://img.shields.io/travis/arpadHegedus/postcss-node-sass.svg
[win-url]: https://ci.appveyor.com/project/arpadHegedus/postcss-node-sass
[win-img]: https://img.shields.io/appveyor/ci/arpadHegedus/postcss-node-sass.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[LibSass]: https://github.com/sass/libsass
[Node-sass]: https://github.com/sass/node-sass
[Node-sass options]: https://github.com/sass/node-sass#options
[PostCSS Node Sass]: https://github.com/arpadHegedus/postcss-node-sass
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
