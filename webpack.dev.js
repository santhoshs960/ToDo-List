const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
    open: false,        // prevents auto opening browser
    hot: true,          // enables HMR
    liveReload: true,   // enables live reload
  },
});
