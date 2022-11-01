const { merge } = require("webpack-merge")
const webpackConfig = require("./webpack.config")
const webpack = require("webpack")

const devWebpackconfig = merge(webpackConfig, {
	mode: "development",
	target: "web",
	devServer: {
		static: {
			directory: webpackConfig.externals.paths.dist
		},
		compress: false,
		hot: false,
		client: {
			overlay: {
				warnings: true,
				errors: true
			}
		},
		port: 8081
	},
	devtool: "eval-cheap-module-source-map",
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: "[file].map"
		}),
		new webpack.HotModuleReplacementPlugin()
	]
})

module.exports = new Promise((resolve, reject) => resolve(devWebpackconfig))
