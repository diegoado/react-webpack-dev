'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath  = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');

  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const resolvePublicUrl = packageJson =>
  envPublicUrl || require(packageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const resolveServedPath = packageJson => {
  const publicUrl = resolvePublicUrl(packageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');

  return ensureSlash(servedUrl, true);
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolvePath('.env'),
  build: resolvePath('build'),
  public: resolvePath('public'),
  indexHtml: resolvePath('public/index.html'),
  indexJs: resolvePath('src/index.js'),
  packageJson: resolvePath('package.json'),
  src: resolvePath('src'),
  yarnLockFile: resolvePath('yarn.lock'),
  nodeModules: resolvePath('node_modules'),
  publicUrl: resolvePublicUrl(resolvePath('package.json')),
  servedPath: resolveServedPath(resolvePath('package.json')),
};
