'use strict';

// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const common = require('../config/webpack.config.common');

module.exports = (storybookWebpack) => {
  storybookWebpack.resolve.alias = common.resolve.alias;

  storybookWebpack.module.rules.push(common.preLoader);

  storybookWebpack.module.rules.push({
    oneOf: [
      common.urlLoader,
      common.jsLoader,
      {
        test: /\.css$/,
        use: [
          'style-loader',
          ...common.cssLoader.use
        ]
      },
      common.fileLoader
    ]
  });

  return storybookWebpack;
};
