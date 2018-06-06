'use strict';

// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = (storybookWebpack, env) => {
  storybookWebpack.resolve.alias = {
    src: path.join(__dirname, '..', 'src')
  };

  storybookWebpack.module.rules.push({
    enforce: 'pre',
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    options: {
      parser: 'babel-eslint',
      plugins: ['react'],
      baseConfig: {
        extends: ['semistandard-react']
      }
    }
  });

  storybookWebpack.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
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
          ]}}
    ]
  });
  return storybookWebpack;
};
