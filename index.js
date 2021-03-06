/**
 * App Entry Script
 */

require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./assets/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./assets/chunk-manifest.json'));

  // In production, serve the webpacked server file.
  require('./server.bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./config/webpack/webpack.babel.js",
          "verbose": false
        }
      ]
    ]
  });
  require('babel-polyfill');

  require('./server/server');
}
