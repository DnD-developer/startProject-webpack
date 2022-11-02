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
	module: {
		rules: [
			{
				test: /\.pug$/,
				exclude: "/node_modules/",
				use: [
					{
						loader: "pug3-loader",
						options: {
							pretty: true
						}
					}
				]
			},
			{
				test: /\.js$/,

				exclude: "/node_modules/",
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/preset-env",
									{
										useBuiltIns: "entry",
										corejs: 3
									}
								]
							]
						}
					},
					{
						loader: "eslint-loader"
					},
					{
						test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
						type: "asset/resource",
						generator: {
							filename: `${PATHS.assets}img/[name]-[contenthash][ext]`
						}
					}
				]
			}
		]
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
