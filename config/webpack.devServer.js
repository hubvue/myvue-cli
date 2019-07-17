const webpack = require("webpack");
module.exports = {
    devServer: {
        hot: true,
        open: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}