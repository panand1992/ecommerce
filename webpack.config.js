const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "production",
	entry: ['babel-polyfill', "./src/app/js/index.js"],
	output: {
		path: `${__dirname}/public/js/`,
		filename: "[name]-bundle.js",
		publicPath: "/js/"
	},
	watch: false,
	plugins: [new CleanWebpackPlugin()],
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-class-properties"]
				}
			}
		},
		{
			test: /\.scss$/,
			use: ["style-loader", // creates style nodes from JS strings
				"css-loader", // translates CSS into CommonJS
				"sass-loader"]
		}]
	}
};
