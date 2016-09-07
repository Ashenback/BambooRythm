var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'app.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'BambooRhythm.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel'
			}, {
				test: /\.frag$/,
				loader: 'raw'
			}
		]
	}
};
