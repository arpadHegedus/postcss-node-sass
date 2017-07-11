let postcss = require('postcss'),
    sass = require('node-sass'),
    stringDecoder = require('string_decoder'),
    decoder = new stringDecoder.StringDecoder('utf8');

module.exports = postcss.plugin('styler', (opt = {}) => {
    return (root, result) => {
        opt = Object.assign(opt, { file: root.source.input.file });
        result.root = postcss.parse(decoder.write(sass.renderSync(opt).css));
    }
});