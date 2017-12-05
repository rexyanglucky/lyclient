'use strict'
const path = require('path')
const fs = require('fs');
const utils = require('./utils')
const config = require('../config')
function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}
function isFile(dir) {
    return fs.statSync(dir).isFile();
}
function isDir(dir) {
    return fs.statSync(dir).isDirectory();
}
function getAllFilesName(dir, nameArr) {
    let files = fs.readdirSync(dir);
    files.map((item, index, arr) => {
        let rpath = path.join(dir, item);
        if (isDir(rpath)) {
            getAllFilesName(rpath, nameArr);
        }
        else {
            let n = rpath.slice(rpath.lastIndexOf('\\entry\\') + '\\entry\\'.length, rpath.length - 3);
            // nameArr[n] = ['webpack-dev-server/client?http://localhost:8080'].concat(rpath);
            nameArr[n]=rpath;

        }
        return item;
    });
}
module.exports = {
    entry: (function () {
        let entry = resolve('src/entry');
        console.log(entry);
        let nameArr = {};
        getAllFilesName(entry, nameArr);
        console.log(nameArr);
        return nameArr;
    })(),
    // entry:{
    //     app:'./src/entry/index/index.js',
    // },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css','.less'],
        alias: {
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                include: [resolve('src')],
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
