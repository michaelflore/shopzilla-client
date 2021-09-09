const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    }, 
    module: {
        rules: [
            {
              test: /\.(svg|gif|jpg|png|ico)(\?[\s\S]+)?$/,
              use: 'file-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader"
                  }
                ]
              }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
          template: "./public/index.html",
          manifest: "./public/manifest.json",
          favicon: "./public/favicon.ico",
          inject: 'body'
        })
    ]
}