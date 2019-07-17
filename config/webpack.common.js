const merge = require("webpack-merge");
const parts = require("./webpack.part");

const config = {
    resolve: {
        extensions: ['.js', '.vue']
    }
}
module.exports = merge([
    config,
    parts.clearFinder(),
    parts.loadJs(),
    parts.loadVue(),
    parts.loadHtml()
])