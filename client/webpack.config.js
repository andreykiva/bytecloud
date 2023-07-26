const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.(js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
				type: 'asset/resource',
			},
		],
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './public/index.html',
		}),
	],
};
