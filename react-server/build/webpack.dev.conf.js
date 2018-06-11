'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const portfinder = require('portfinder')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true, extract: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    historyApiFallback: true,
    hot: false,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
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
        { from: /^\/manage$/, to: '/manage/manage.html' },
        { from: /^\/manage\/.*$/, to: '/manage/manage.html' },
        { from: /^\/article\/.*$/, to: '/index/index.html' },
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
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
      },
      allChunks: true
    }),
        // copy custom static assets
    new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
          }
        ]),

  ]
})
let files = fs.readdirSync(path.resolve(__dirname, "..", "src/ejs"));
(function (files) {
  for (let k = 0; k < files.length; k++) {
    let f = files[k];
    let chunks = f;
    if (chunks === "common") { continue; }
    let template = path.resolve(__dirname, "..", `src/ejs/${chunks}/template.js`);
   
    //判断template 是否存在, 若不存在使用默认配置
    if (fs.existsSync(template)) {
      template=`src/ejs/${chunks}/template.js`;
    }
    else{
      template = `src/ejs/common/defaultTemplate.js`;
    }
    let htmlWebpackPluginConfig= {
      filename: f + ".html",
      template: template,
      inject: true,
      chunks: [`${chunks}/index`, 'vendor', 'manifest'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    };
    if(["manage","index"].indexOf(chunks)>-1){
      htmlWebpackPluginConfig.filename=f+"/"+f+".html";
    }
    console.log(htmlWebpackPluginConfig.filename);
    let htmlWebpackPlugin = new HtmlWebpackPlugin(htmlWebpackPluginConfig);
    devWebpackConfig.plugins.push(htmlWebpackPlugin);
  }
})(files)


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
