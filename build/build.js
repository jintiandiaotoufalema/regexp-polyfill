const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    'regexp-polyfill': './src/index.ts',
    ReRegExp: './src/ReRegExp.ts'
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
};

module.exports = config;