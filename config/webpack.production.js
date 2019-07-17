const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const {resolve} = require("path");
const parts = require("./webpack.part");
const {} = require("webpack");
const config = {
    output: {
        path: resolve("./dist"),
        filename: "scripts/[name]-[chunkhash:5].js"
    },
    optimization: {
        runtimeChunk: {
            name: "runtime"
        },
        splitChunks: {
            chunks: 'all',
            minSize: 3000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                common: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    }
};


module.exports = merge([
    config,
    parts.MiniCss(),
    parts.MiniLess(),
    parts.MiniStylus()
])




