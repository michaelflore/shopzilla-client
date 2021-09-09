const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
    mode: "development",
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
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              }
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
    devtool: "cheap-module-source-map",
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        port: 3000,
        hot: true,
        historyApiFallback: true,
        proxy: {
          '/api': 'http://localhost:8080',
        }   
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico"
      })
  ]
}