const merge = require('webpack-merge') //合并webpack配置项
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
module.exports = merge(webpackConfig, {
	mode: 'development',
	// 打包文件之后，方便调试
	devtool: 'cheap-module-eval-source-map', //cheap-module-eval-source-map是打包文件时生成source-map最快的方法source-map和打包后的js文件同行显示
	module: {
		rules: [
			{
				test: /.(scss|sass)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('dart-sass')
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
	]
})
