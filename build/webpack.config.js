const path = require('path')
const HtmlWebpackPlugin = require('html-webppack-plugin')
const webpack = require('webpack')
module.exports = {
    // 指定打包模式
    mode: 'development',
    entry: {
        // 配置入口文件
        main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')]
    },
    output: {
        // 配置打包文件输出地址
        path: path.resolve(__dirname, '../dist'),
        // 生成的js文件名
        filename: 'js/[name].[hash:8].js',
        // 生成的chunk名
        chunkFilename: 'js/[name].[hash:8].js',
        // 资源应用的路劲
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    // 将css插入html中
                    {
                        loader: 'style-loader'
                    },
                    // 解析引入的css文件
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    // 将scss/sass语法转化为css
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass')
                        } 
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        hot: true,
        port: 3000,
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),
        // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
        new webpack.NamedModulesPlugin()
    ]
}