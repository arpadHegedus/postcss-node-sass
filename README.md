# PostCSS Node Sass [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][PostCSS]

A [PostCSS] plugin to parse styles with [node-sass]

[PostCSS]: https://github.com/postcss/postcss
[Gulp]: https://github.com/gulpjs/gulp
[node-sass]: https://github.com/sass/node-sass

## Installation

```js
npm install postcss-node-sass
```

## Usage

Using [Gulp]

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