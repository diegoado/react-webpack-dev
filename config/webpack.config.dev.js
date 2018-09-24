'use strict';

const path = require('path');
const webpack = require('webpack');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line max-len
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const common = require('./webpack.config.common');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('../polyfills'),
    'react-hot-loader/patch',
    `webpack-dev-server/client?${protocol}://${host}:${port}`,
    'webpack/hot/only-dev-server',
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.indexJs
  ],
  output: Object.assign({}, common.output, {
    pathinfo: false,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name]-chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  }),
  resolve: common.resolve,
  module: {
    strictExportPresence: true,
    rules: [
      common.preLoader,
      {
        oneOf: [
          common.urlLoader,
          common.jsLoader,
          {
            test: /\.css$/,
            use: ['style-loader', ...common.cssLoader.use]
          },
          common.fileLoader
        ]
      }
    ]
  },
  plugins: [
    ...common.plugins,
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: false,
      title: common.projectName,
      template: paths.indexHtml
    }),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.nodeModules)
  ],
  node: common.node,
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
};
