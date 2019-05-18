'use strict';

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var precss = require('precss');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var childProcess = require('child_process'),
	VERSION = childProcess.execSync('git rev-parse HEAD').toString().substr(0,8);

var HTMLFiles = require('./html-files');

var plugins = [
	new ExtractTextPlugin('../css/[name].bundle.css'),
	new UglifyJSPlugin({
		compress: {
			warnings: false,
			drop_console: true
		},
		output: {
			comments: false,
			beautify: false
		}
	})
]

HTMLFiles.files.map((file) => {
	file.version = '?version=' + VERSION;
	plugins.push(
		new HtmlWebpackPlugin(file)
	);
});

module.exports = {
	watch: false,
	entry: {
		main: './src/main'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './docs/js')
	},
	resolve: {
    alias: {}
  },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src/assets/js'),
				loader:'babel-loader',
				query: {
		 			presets: ['es2015']
				}
			},
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('css!postcss!sass')
			},
			{
				test: /\.(gif|png|jpg|ico|jpeg)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=../img/[name].[ext]'
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=../fonts/[name].[ext]'
			}
		]
	},
	postcss: function () {
		return [ autoprefixer, precss ]
	},
	plugins
};
