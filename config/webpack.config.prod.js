var webpack = require('webpack');
var path = require('path');
var libraryName = 'ui-beakers';
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.resolve('./src/index.js'),
    externals: [nodeExternals()],
    devtool: 'source-map',
    output: {
        path: path.resolve(),
        filename: 'index.js',
        library: libraryName,
        libraryTarget: 'umd',
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: "url-loader?limit=100000"
            },
        ],
    },
    plugins: [
        webpack.optimize.UglifyJsPlugin,
    ],
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js'],
    },
};
