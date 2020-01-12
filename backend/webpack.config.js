const path = require('path');

/*
  webpack sees every file as a module.
  How to handle those files is up to loaders.
  We only have a single entry point (a .js file) and everything is required from that js file
*/

// This is our JavaScript rule that specifies what to do with .js files
const javascript = {
	test: /\.(js)$/, // see how we match anything that ends in `.js`? Cool
	use: [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	]
};

// OK - now it's time to put it all together
const config = {
	mode: 'production',
	entry: {
		// we only have 1 entry, but I've set it up for multiple in the future
		frontend: './public/javascript/frontend.js'
	},
	// Once things are done, we kick it out to a file.
	output: {
		// path is a built in node module
		// __dirname is a variable from node that gives us the
		path: path.resolve(__dirname, 'public', 'dist'),
		// we can use "substitutions" in file names like [name] and [hash]
		// name will be `app` because that is what we used above in our entry
		filename: '[name].bundle.js'
	},

	// remember we said webpack sees everthing as modules and how different loaders are responsible for different file types? Here is is where we implement them. Pass it the rules for our JS
	module: {
		rules: [javascript]
	}
};

module.exports = config;
