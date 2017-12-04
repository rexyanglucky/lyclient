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
const portfinder = require('portfinder')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  
  // these devServer options should be customized in /config/index.js
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    historyApiFallback: {
      rewrites: [
          // shows views/landing.html as the landing page
          // { from: /^\/interview\/login$/, to: '/interview/index.html' },
          // { from: /^\/iv_examination_room$/, to: '/iv_index.html' },
          // { from: /^\/iv_user_center$/, to: '/iv_index.html' },
          // { from: /^\/iv_examination_room$/, to: '/iv_index.html' },
          // { from: /^\/iv_examination_search$/, to: '/iv_index.html' },
          // { from: /^\/iv_schedule$/, to: '/iv_index.html' },
          // { from: /^\/iv_resumedetails$/, to: '/iv_index.html' },
          // { from: /^\/iv_resumecomment$/, to: '/iv_index.html' },
          // { from: /^\/iv_resumeList$/, to: '/iv_index.html' },
          // { from: /^\/interview/, to: '/interview/index.html' },
          // // shows views/subpage.html for all routes starting with /subpage
          // { from: /^\/subpage/, to: '/views/subpage.html' },
          // // shows views/404.html on all other pages
          // { from: /./, to: '/views/404.html' },
      ],
  },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.html',
      inject: true,
      chunks:['index\\index']
      // serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
      //   './service-worker-dev.js'), 'utf-8')}</script>`
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: 'src/html/test.html',
      chunks:['test\\test'],
      inject: true,
      // serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
      //   './service-worker-dev.js'), 'utf-8')}</script>`
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
