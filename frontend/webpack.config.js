var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill', './reactive-shop.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
