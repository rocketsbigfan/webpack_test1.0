
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 指定打包模式
    mode: 'development',
    entry: {
        // 配置入口文件
        main: path.resolve(__dirname, '../src/main.js')    
    },
    output: {
        // 配置打包文件输出地址
        path: path.resolve(__dirname, '../dist'),
        // 生成的js文件名
        filename: 'js/[name].[hash:8].js',
        // 生成的chunk名
        chunkFilename: 'js/[name].[hash:8].js',
        // 资源应用的路劲
        publicPath: '/'
    },
    resolve: {
    	alias: {
    		//通过vue结尾来代替‘vue/dist/vue.runtime.esm.js’路径 
    		vue$: 'vue/dist/vue.runtime.esm.js' 
    	},
    	//导入语句没带后缀时webpack自动加上后缀去尝试访问文件
    	extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
            	test: /\.vue$/,
            	use: [
            		{
            			// 缓存loader编译的结果
            			loader: 'cache-loader',
            		},
            		// {
            			// 缓存loader编译的结果
            			// loader: 'thread-loader',
            		// },
            		{
            			// 使用 worker 池来运行loader，每个 worker 都是一个 node.js 进程
            			loader: 'vue-loader',
            			options: {
            				complierOptions: {
            					preserveWhitespace: false
            				}
            			}
            		}

            	]
            },
            {
                test: /\.jsx?$/,
    			exclude: /(node_modules)/,
                use: [
             //    	{
		           //  	loader: 'cache-loader'
		          	// },
		          	// {
		           //  	loader: 'thread-loader'
		          	// },
		          	{
		            	loader: 'babel-loader',
		          	}
		        ]

            },
            {
		        test: /\.(jpe?g|png|gif)$/,
		        use: [
					{
						loader: 'url-loader',
						options: {
						  limit: 4096,
						  fallback: {
						    loader: 'file-loader',
						    options: {
						      name: 'img/[name].[hash:8].[ext]'
						    }
						  }
						}
					}
				]
				},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: [
				  {
				    loader: 'url-loader',
				    options: {
				      limit: 4096,
				      fallback: {
				        loader: 'file-loader',
				        options: {
				          name: 'media/[name].[hash:8].[ext]'
				        }
				      }
				    }
				  }
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
				  {
				    loader: 'url-loader',
				    options: {
				      limit: 4096,
				      fallback: {
				        loader: 'file-loader',
				        options: {
				          name: 'fonts/[name].[hash:8].[ext]'
				        }
				      }
				    }
				  }
				]
			},
        ]
    },
    devServer: {
        hot: true,
        port: 3037,
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),
        // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
        new webpack.NamedModulesPlugin(),
        new VueLoaderPlugin(),
        // 定义环境变量
        new webpack.DefinePlugin({
        	'process.env': {
        		NODE_ENV: JSON.stringify('development')
        	}
        })
    ]
}