let fs = require('fs'),
    plugin = require('./'),
    postcss = require('postcss'),
    testFile = (file, options = {}, plugins = []) => () => {
        let inputFile = `./tests/${file}`,
            outputFile = `./tests/expected/${file}`,
            input = fs.readFileSync(inputFile, 'utf8').toString(),
            expected = fs.readFileSync(outputFile, 'utf8').toString();
        options.from = inputFile;
        options.to = outputFile;
        if (plugins.length === 0) plugins.push(plugin(options));
        return expect(postcss(plugins).process(input, options)
            .then(result => {
                return result.css;
            })
            .catch(error => error)).resolves.toEqual(expected);
    };

it('can stack selectors', testFile('stack.css'));
it('can import other files', testFile('import.css'));
it('can use variables', testFile('variable.css'));
it('can use functions', testFile('function.css'));
it('can use mixins', testFile('mixin.css'));
it('can use @each', testFile('each.css'));
