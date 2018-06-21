'use strict';

const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.config.common');
const paths = require('./paths');

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = (cssFilename) => common.shouldUseRelativeAssetPaths
  // Making sure that the publicPath goes back to to build folder.
  ? { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

// Note: defined here because it will be used more than once.
const crpFilename = 'static/css/styles.css';
const cssFilename = 'static/css/[name].[contenthash:8].css';

const cssExtractText = new ExtractTextPlugin({ filename: cssFilename });
const crpExtractText = new ExtractTextPlugin({ filename: crpFilename });

const chunksOrder = ['react', 'vendor', 'main'];

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate source maps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: common.shouldUseSourceMap ? 'source-map' : false,
  // In production, we only want to load the polyfills and the app code.
  entry: {
    main: [
      require.resolve('../polyfills'),
      paths.indexJs
    ]
  },
  output: Object.assign({}, common.output, {
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path
      .relative(paths.src, info.absoluteResourcePath)
      .replace(/\\/g, '/')
  }),
  resolve: Object.assign({}, common.resolve, {
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'src': path.join(__dirname, '..', 'src')
    }
  }),
  module: {
    strictExportPresence: true,
    rules: [
      common.preLoader,
      {
        oneOf: [
          common.urlLoader,
          Object.assign({}, common.jsLoader, {
            options: {
              babelrc: false,
              compact: true,
              presets: [
                ['env', { modules: false }],
                'stage-0',
                'react'
              ],
              plugins: [
                'react-hot-loader/babel',
                ['transform-runtime', {
                  helpers: false,
                  polyfill: false,
                  regenerator: true,
                  moduleName: 'babel-runtime'
                }]
              ]
            }
          }),
          // The notation here is somewhat confusing.
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader normally turns CSS into JS modules injecting <style>,
          // but unlike in development configuration, we do something different.
          // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
          // (second argument), then grabs the result CSS and puts it into a
          // separate file in our build process. This way we actually ship
          // a single CSS file in production instead of JS code injecting <style>
          // tags. If you use code splitting, however, any async bundles will still
          // use the "style" loader inside the async code so CSS from them won't be
          // in the main CSS file.
          {
            test: common.criticalRendering,
            include: paths.src,
            loader: crpExtractText.extract(
              Object.assign(
                common.cssLoader,
                extractTextPluginOptions(crpFilename)
              )
            )
          },
          {
            test: /\.css$/,
            include: paths.src,
            exclude: [...common.criticalRendering],
            loader: cssExtractText.extract(
              Object.assign(
                common.cssLoader,
                extractTextPluginOptions(cssFilename)
              )
            )
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
      template: paths.indexHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunksSortMode: (chunk1, chunk2) => {
        return (
          chunksOrder.indexOf(chunk1.names[0]) - chunksOrder.indexOf(chunk2.names[0])
        );
      }
    }),
    //  Separate common modules from bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      chunks: ['main'],
      minChunks: ({ resource }) => (
        /node_modules\/(react(-dom)?|fbjs)/.test(resource) ||
        /node_modules\/preact/.test(resource)
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: ({ resource }) => /node_modules/.test(resource)
    }),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false
      },
      mangle: {
        safari10: true
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true
      },
      sourceMap: common.shouldUseSourceMap
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    crpExtractText,
    cssExtractText,
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({ fileName: 'asset-manifest.json' }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger (message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: common.publicUrl + '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache source maps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ].concat(
    process.env.ANALYZER ? new BundleAnalyzerPlugin() : []
  ),
  node: common.node
};
