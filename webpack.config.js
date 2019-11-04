var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  entry: [APP_DIR + '/index.jsx', 'webpack-dev-server/client?http://0.0.0.0:80'],
  output: {
    path: BUILD_DIR,
    publicPath: "/public/",
    filename: 'chat.js'
  },
  devtool: 'source-map',
  stats: {
    colors: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;