const { merge } = require("webpack-merge")
const webpackConfig = require("./webpack.config")

const prodWebpackConfig = merge(webpackConfig, {
	mode: "production",
	target: "browserslist",
	plugins: []
})

module.exports = new Promise((resolve, reject) => {
	resolve(prodWebpackConfig)
})
