'use strict';

const autoprefixer = require('autoprefixer');
const loadsh = require('lodash');
const path = require('path');
const webpack = require('webpack');

const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const clientEnvironment = require('./env');
const paths = require('./paths');
const packageJson = require(paths.packageJson);

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = process.env.NODE_ENV === 'production' ? paths.servedPath : '/';
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath === '/' ? '' : publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = clientEnvironment(publicUrl);

// noinspection WebpackConfigHighlighting
module.exports = {
  criticalRendering: packageJson.criticalRendering
    .map(file => new RegExp(file)),

  projectName: loadsh.startCase(packageJson.name || 'react-app'),

  publicUrl: publicUrl,

  publicPath: publicPath,

  shouldUseSourceMap: shouldUseSourceMap,

  shouldUseRelativeAssetPaths: shouldUseRelativeAssetPaths,

  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.nodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      'src': paths.src,
      'components': path.join(paths.src, 'app', 'components'),
      'reducers': path.join(paths.src, 'redux-flow', 'reducers')
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.src, [paths.packageJson])
    ]
  },

  output: {
    path: paths.build,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project)
    publicPath: publicPath
  },

  preLoader: {
    enforce: 'pre',
    test: /\.(js|jsx|mjs)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  },

  urlLoader: {
    test: /\.(mp4|webm|wav|mp3|m4a|acc|oga)(\?.*)?$/,
    include: paths.src,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'static/media/[name].[hash:8].[ext]'
    }
  },

  jsLoader: {
    test: /\.(js|jsx|mjs)$/,
    include: paths.src,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },

  cssLoader: {
    fallback: {
      loader: 'style-loader',
      options: {
        hmr: false
      }
    },
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: false,
          importLoaders: 1,
          minimize: process.env.NODE_ENV === 'production',
          sourceMap: shouldUseSourceMap
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-modules')({
              globalModulePaths: [/styles/]
            }),
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            })
          ]
        }
      }
    ]
  },

  fileLoader: {
    test: /\.(ico|jpe?g|png|gif|eof|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    include: paths.src,
    loader: 'file-loader',
    options: {
      name: 'static/media/[name].[hash:8].[ext]'
    }
  },

  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(env.raw),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
