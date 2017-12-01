/**
 * POSTCSS-NODE-SASS
 * A PostCSS plugin to parse styles with node-sass
 * 
 * @author Arpad Hegedus <hegedus.arpad@gmail.com>
 */

let postcss = require('postcss'),
    sass = require('node-sass'),
    mergeSourceMap = require('merge-source-map');

module.exports = postcss.plugin('styler', (opt = {}) => {
    return (root, result) => {
        let css = root.toResult(Object.assign({ map: { annotation: false, inline: false, sourcesContent: true } }));
        opt = Object.assign({
            file: result.opts.from,
            outFile: result.opts.to,
            data: css.css,
            indentWidth: 4,
            omitSourceMapUrl: true,
            outputStyle: 'expanded',
            sourceMap: true,
            sourceMapContents: true
        }, opt);
        let res = '';
        try { 
            res = sass.renderSync(opt);
        } catch(err) { 
            console.log('');
            console.log('\x1b[33m%s\x1b[0m', 'POSTCSS-NODE-SASS ERROR');
            console.warn(err.formatted);
            console.log('');
        }
        result.root = postcss.parse(res.css.toString(), {
            from: css.from,
            map: { prev: mergeSourceMap(css.map.toJSON(), JSON.parse(res.map)) }
        });
    }
});