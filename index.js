/**
 * POSTCSS-NODE-SASS
 * A PostCSS plugin to parse styles with node-sass
 */

let postcss = require('postcss'),
    sass = require('node-sass'),
    mergeSourceMap = require('merge-source-map');

module.exports = postcss.plugin('postcss-node-sass', opt => (root, result) => {
    let css = root.toResult(Object.assign(result.opts, {
        map: { annotation: false, inline: false, sourcesContent: true }
    }));
    opt = Object.assign({
        indentWidth: 4,
        omitSourceMapUrl: true,
        outputStyle: 'expanded',
        sourceMap: true,
        sourceMapContents: true
    }, opt, {
        data: css.css,
        file: result.opts.from,
        outFile: result.opts.to
    });
    return new Promise((resolve, reject) => sass.render(
        opt,
        (err, res) => err ? reject(err) : resolve(res)
    )).then(res => postcss.parse(res.css.toString(), {
        from: result.opts.from,
        map: {
            prev: mergeSourceMap(css.map.toJSON(), JSON.parse(css.map))
        }
    })).then(res => {
        result.root = res;
    });
});
