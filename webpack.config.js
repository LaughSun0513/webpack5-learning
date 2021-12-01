const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js',
        // src里写的路径为 publicPath+filename 就是打包后资源的前缀
        // dist/main.js --> /assets/main.js
        // 一般指向CDN地址
        publicPath: '/assets'
    },
    devServer: {
        static: resolve(__dirname, 'dist'),
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        liveReload: true,
        devMiddleware: {
            writeToDisk: true,
            // dist/main.js --> http://localhost:8080/assets/main.js 可以通过该路径获取打包后的资源
            publicPath: '/assets'
        }
    },
    module: {
        rules: [
            // { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.txt$/,
                type: 'asset/source'
            },
            {
                test: /\.css$/i, use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        url: true
                    }
                }]
            },
            { test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            // {
            //     test: /\.(jpg|png|gif)$/, use: [{
            //         loader: 'url-loader',
            //         options: {
            //             esModule: false
            //         }
            // }]},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1000 * 1024,
                    },
                },
                generator: {
                    filename: 'images/[base]',
                },
            },
            { test: /\.html$/i, use: ["html-loader"] },
            {
                test: /\.(ts|js)x?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}