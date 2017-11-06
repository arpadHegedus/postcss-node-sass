const processOptions = {
	map: {
		inline: true,
		sourcesContent: true
	}
};

module.exports = {
	'postcss-node-sass': {
		'basic': {
			message: 'supports basic usage',
			processOptions: processOptions
		},
		'basic:sassopts': {
			message: 'supports sass options usage',
			options: {
				indentType: 'tab',
				indentWidth: 1,
				outputStyle: 'expanded'
			},
			processOptions: processOptions
		},
		'basic:mixed': {
			message: 'supports mixed (postcss-unroot, postcss-node-sass) usage',
			plugin: () => require('postcss')(
				require('postcss-unroot'),
				require('.')
			),
			processOptions: processOptions
		},
		'basic:mixed:after': {
			message: 'supports mixed (postcss-node-sass, postcss-unroot) usage',
			plugin: () => require('postcss')(
				require('.'),
				require('postcss-unroot')
			),
			processOptions: processOptions
		},
		'mixed': {
			message: 'supports mixed (postcss-import, postcss-node-sass) usage',
			plugin: () => require('postcss')(
				require('postcss-import'),
				require('.')
			),
			processOptions: processOptions
		}
	}
};
