const path = require('path');
const webpack = require('webpack');

/**
 *  NOTICE: modules used:
 *  "style-loader": "^0.19.1",
 *  "css-loader": "^0.28.7",
 */

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
      {test: /\.jsx$/, loader: 'babel-loader', exclude:/node_modules/},
        {
         test: /\.css$/,
         use: [
           {
              loader: 'style-loader',
           },
           {
              loader: 'css-loader',
              options: {
                 sourceMap: true,
                 modules: true,
                 localIdentName: '[local]___[hash:base64:5]'
                }
           }
           ],
        }]
  
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ]
  }
}
