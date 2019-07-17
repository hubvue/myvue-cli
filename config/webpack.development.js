const merge = require("webpack-merge");
const parts = require("./webpack.part");
const devServe = require("./webpack.devServer");

const config = {
    devtool: "source-map"
}
module.exports = merge([
    config,
    devServe,
    parts.loadCss(),
    parts.loadLess(),
    parts.loadStylus()
])