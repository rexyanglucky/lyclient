'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const serverWebpackConfig = merge(baseWebpackConfig, {
  target: "node",
 
  // output: {
  //   path: config.build.assetsRoot,
  //   filename: utils.assetsPath('js/[name].js'),
  //   chunkFilename: utils.assetsPath('js/[name].js'),
  //   publicPath: process.env.NODE_ENV === 'production'
  //       ? config.build.assetsPublicPath
  //       : config.dev.assetsPublicPath
  // },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true, extract: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
   
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
      },
      allChunks: true
    })

  ]
})
module.exports = new Promise((resolve, reject) => {
  serverWebpackConfig.entry = (function () {
    // console.log(path.join(__dirname, "../src", 'server.js'));
    return path.join(__dirname, "../src", 'server.js');
  })();
  serverWebpackConfig.output = {
    path: config.build.assetsRoot,
    filename: 'server/server.js',
   
  };
  resolve(serverWebpackConfig)
})
