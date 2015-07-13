var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080' , // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './src/js/index.js'
    ],
    output: {
        path: "./dist",
        filename: 'app.js',
        sourceMapFilename: '[file].map',
    },
    module: {
        loaders: [
            {  
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                query: {
                   stage: 1
                }
            },
            // { test: /\.(png|jpg|svg)$/, loader: 'url-loader?name=images/[name].[ext]&limit=100' }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()

    ]
};