const merge = require('webpack-merge') //合并webpack配置项
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin') //清空上次打包文件
const CopyWebpackPlugin = require('copy-webpack-plugin') //用户拷贝静态资源
const MiniCssExtractPLugin = require('mini-css-extract-plugin') //提取css到文件
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin'); //压缩css文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(webpackConfig, {
	mode: 'development',
	// 打包文件之后，方便调试
	devtool: '#source-map', //source-map:在一个单独文件中产生一个完整且功能完全的文件。这个文件具有最好的source map,但是它会减慢打包速度；
	// 打包公共文件
	optimization: {
		splitChunks: {
			// 设置缓存组用来抽取满足不同规则的chunk
			cacheGroups: {
				// 处理入口chunk
				vendors: {
		          name: 'chunk-vendors',
		          test: /[\\\/]node_modules[\\\/]/,
		          priority: -10, // 处理chunk优先级
		          chunks: 'initial'
		        },
		        common: {
		          name: 'chunk-common',
		          minChunks: 2,
		          priority: -20,
		          chunks: 'initial',
		          reuseExistingChunk: true
		        }

			}
		}
	},
	module: {
		rules: [
			{
				test: /.(scss|sass)$/,
				use: [
					{
						loader: MiniCssExtractPLugin.loader
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
				NODE_ENV: JSON.stringify('production')
			}
		}),
		// 压缩css文件
	    new MiniCssExtractPLugin({
	      filename: 'css/[name].[contenthash:8].css',
	      chunkFilename: 'css/[name].[contenthash:8].css'
	    }),
	    new OptimizeCssnanoPlugin({
	      sourceMap: true,
	      cssnanoOptions: {
	        preset: [
	          'default',
	          {
	            mergeLonghand: false,
	            cssDeclarationSorter: false
	          }
	        ]
	      }
	    }),
	    // 将所有可能被请求的静态资源复制到dist文件夹下
	    new CopyWebpackPlugin([
	      {
	        from: path.resolve(__dirname, '../public'),
	        to: path.resolve(__dirname, '../dist')
	      }
	    ]),
		new CleanWebpackPlugin(),

		new BundleAnalyzerPlugin()
	]
})
