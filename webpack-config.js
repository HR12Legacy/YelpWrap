const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    hotUpdateChunkFilename: './hot/hot-update.js',
    hotUpdateMainFilename: './hot/hot-update.json'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude:/node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude:/node_modules/}
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ]
  }
}