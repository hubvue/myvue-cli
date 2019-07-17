const merge = require("webpack-merge");
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const commonConfig = require("./config/webpack.common");
const envConfig = require(`./config/webpack.${_mode}`);

console.log(process.env.NODE_ENV);
module.exports = merge([
    commonConfig,
    envConfig
]);