/**
 * 加载Vue
 */
const VuePlugin = require("vue-loader/lib/plugin");
const loadVue = () => ({
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader",
            exclude: /(node_modules)/
        }]
    },
    plugins: [
        new VuePlugin()
    ]
});
/**
 * 加载js
 */
const loadJs = () => ({
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /(node_modules)/
        }]
    }
});
/**
 * 开发加载CSS
 * @param {*} param0 
 */
const loadCss = ({reg = /\.css$/, uses = [], include, exclude } = {}) => ({
    module: {
        rules: [{
            test: reg,
            include,
            exclude,
            use: [{
                loader: "style-loader"
            },{
                loader: "css-loader"
            }].concat(uses)
        }]
    }
})


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCss = ({reg = /\.css$/, uses = [], include, exclude } = {}) => ({
    module: {
        rules: [{
            test: reg,
            include,
            exclude,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },{
                loader: "css-loader"
            }].concat(uses)
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name]-[chunkhash:5].css",
            chunkFilename: "styles/[id]-[chunkhash:5].css",
        })
    ]
})
/**
 * 
 * 加载CSS预处理器工厂
 * 
 */
const loadCssFactory = load => ({reg, loader, include, exclude} = {}) => load({
    reg,
    uses: [{
        loader,
    }],
    include,
    exclude,
})
/**
 * dev加载css
 */

 const loadCssFun = loadCssFactory(loadCss);
/**
 *  prod加载css 
 */
const loadMiniCssFun = loadCssFactory(MiniCss);
/**
 * dev模式加载Less
 * @param {*} param0 
 */
const loadLess = ({include, exclude} = {}) => loadCssFun({
    reg: /\.less$/,
    loader: "less-loader",
    exclude,
    include
})
/**
 * dev模式加载Stylus
 * @param {*} param0 
 */
const loadStylus = ({include, exclude} = {}) => loadCssFun({
    reg: /\.(stylus|styl|stylu)$/,
    loader: "stylus-loader",
    exclude,
    include,
})
/**
 * prod模式加载Less
 */
const MiniLess = ({include, exclude} = {}) => loadMiniCssFun({
    reg: /\.less$/,
    loader: "less-loader",
    exclude,
    include
})
/**
 * prod模式加载Stylus
 */
const MiniStylus = ({include, exclude} = {}) => loadMiniCssFun({
    reg: /\.(stylus|styl|stylu)$/,
    loader: "stylus-loader",
    exclude,
    include,
})
/**
 * 加载html
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const loadHtml = ({template = './index.html'} ={}) => ({
    plugins: [
        new HtmlWebpackPlugin({
            template,
            filename: "index.html"
        })
    ]
})

/**
 * 清空dist
 * 清空根路径为打包路径
 */
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const clearFinder = ({path=['/'] } = {}) => ({
    plugins: [
        new CleanWebpackPlugin()
    ]
});

module.exports = {
    clearFinder,
    loadCss,
    loadHtml,
    loadJs,
    loadLess,
    loadStylus,
    loadVue,
    MiniCss,
    MiniLess,
    MiniStylus
}