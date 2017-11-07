var path = require('path');
var config={
    entry:"./js/test.js",
    output:{
        path:path.join(__dirname,"./dist/js"),
        publicPath:'',
        filename:'[name].js'
    },
    devtool: "#cheap-module-eval-source-map",//dev 时使用
    module: {
        loaders: [
            {
                test: /\.tpl$/,
                loader: "tmodjs-loader"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }

        ]
    },
    resolve: {
        extensions: ['.js', '.tpl', '.less', '.json'],

    }
}
module.exports=config;