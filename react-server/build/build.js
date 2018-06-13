const webpack=require('webpack');
const webpackConf=require('./webpack.prod.conf');
const rm=require('rimraf');
const config = require('../config');
const path = require('path')


rm(path.join(config.build.assetsRoot),err=>{
    if(err){throw err;}
    else{
        webpack(webpackConf,(err,stats)=>{
            console.log(stats)
        });
    }
})