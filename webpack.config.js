/* eslint-env node */

const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
  },
  target: 'electron-renderer',
  entry: {
    renderer: './src/renderer',
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      kawamoto: path.resolve(__dirname, 'src'),
    },
  },
};
