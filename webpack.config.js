const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js',
        // src里写的路径为 publicPath+filename
        publicPath: '/'
    },
    devServer: {
        static: resolve(__dirname, 'dist'),
        port: 8080,
        open: true,
        hot: true
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader'},
            {
                test: /\.css$/i, use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        url: true
                    }
            }] },
            { test: /\.less/, use: ['style-loader', 'css-loader','less-loader'] },
            { test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.(jpg|png|gif)$/, use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[hash:10].[ext]',
                        esModule: false,
                        limit: 400 * 1028
                    }
            }]},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}