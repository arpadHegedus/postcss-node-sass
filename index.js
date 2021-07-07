/**
 * POSTCSS-NODE-SASS
 * A PostCSS plugin to parse styles with node-sass
 */

let postcss = require('postcss'),
    defaultNodeSass = require('node-sass');

module.exports = opt => ({
    postcssPlugin: 'postcss-node-sass',
    Once (root, { result }) {
        let sass = opt.sass || defaultNodeSass;
        let map = typeof result.opts.map === 'object' ? result.opts.map : {}
        let css = root.toResult(Object.assign(result.opts, {
            map: Object.assign({
                annotation: false,
                inline: false,
                sourcesContent: true
            }, map)
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
        let includedFiles
        return new Promise((resolve, reject) => sass.render(
            opt,
            (err, res) => err ? reject(err) : resolve(res)
        )).then(res => {
            includedFiles = res.stats.includedFiles.filter((item, pos, array) => array.indexOf(item) === pos)
            return postcss.parse(res.css.toString(), {
                from: result.opts.from,
                map: {
                    prev: res.map ? JSON.parse(res.map.toString()) : ''
                }
            })
        }).then(res => {
            result.root = res;
            result.messages = includedFiles.map(file => ({ type: 'dependency', parent: result.opts.from, file }))
        });
    }
});

module.exports.postcss = true;
