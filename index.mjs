// tooling
import mergeSourceMap from 'merge-source-map';
import postcss from 'postcss';
import sass from 'node-sass';

// transform css with sass
export default postcss.plugin('postcss-node-sass', opts => (root, result) => {
	// postcss options
	const postOpts = Object.assign({}, result.opts, requiredPostOpts);

	// postcss results
	const { css: postCSS, map: postMap } = root.toResult(postOpts);

	// sass options
	const sassOpts = Object.assign({}, opts, requiredSassOpts, {
		file: postOpts.from,
		outFile: postOpts.to,
		data: postCSS
	});

	return new Promise(
		// promise sass results
		(resolve, reject) => sass.render(
			sassOpts,
			(error, sassResult) => error ? reject(error) : resolve(sassResult)
		)
	).then(
		// promise sass to postcss ast
		({ css: sassCSS, map: sassMap }) => postcss.parse(
			sassCSS.toString(),
			{
				from: postOpts.from,
				map: {
					prev: mergeSourceMap(
						postMap.toJSON(),
						JSON.parse(sassMap)
					)
				}
			}
		)
	).then(
		// promise root as postcss ast
		newroot => {
			result.root = newroot;
		}
	);
});

const requiredPostOpts = {
	map: {
		annotation: false,
		inline: false,
		sourcesContent: true
	}
};

const requiredSassOpts = {
	omitSourceMapUrl: true,
	sourceMap: true,
	sourceMapContents: true
};
