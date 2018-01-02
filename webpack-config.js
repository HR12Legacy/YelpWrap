const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
}