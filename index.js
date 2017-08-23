let postcss = require('postcss'),
    sass = require('node-sass'),
    stringDecoder = require('string_decoder'),
    decoder = new stringDecoder.StringDecoder('utf8');

module.exports = postcss.plugin('styler', (opt = {}) => {
    return (root, result) => {
        opt = Object.assign(opt, { data: root.toString() });
        let theMap = opt.data;
        try {
            theMap = sass.renderSync(opt).css;
        } catch (e) {
            console.log('');
            console.log('\x1b[33m%s\x1b[0m', 'POSTCSS-NODE-SASS ERROR');
            console.warn(e.formatted);
            console.log('');
        }
        result.root = postcss.parse(decoder.write(theMap));
    }
});