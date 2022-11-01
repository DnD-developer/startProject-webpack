const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

const PATHS = {
	dist: path.join(__dirname, "../dist"),
	app: path.join(__dirname, "../app"),
	assets: "assets/"
}
PATHS["assetsStart"] = path.join(PATHS.app, "./layout/assets")
module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		main: [PATHS.app]
	},
	output: {
		filename: `${PATHS.assets}js/[name]-[contenthash].js`,
		path: PATHS.dist
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: "vendors",
					test: /node_modules/,
					chunks: "all",
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,

				exclude: "/node_modules/",
				use: {
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
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { sourceMap: true }
					},

					{
						loader: "postcss-loader",
						options: { sourceMap: true, postcssOptions: { config: path.resolve(__dirname, "../config/postcss.config.js") } }
					},

					{
						loader: "sass-loader",
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: `${PATHS.assets}fonts/[name][ext]`
				}
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: `${PATHS.assets}img/[name][ext]`
				}
			},
			{
				test: /\.html$/,
				use: "html-loader"
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name]-[contenthash].css`
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: `${PATHS.assetsStart}/static`, to: `${PATHS.assets}static` }]
		}),
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			hash: false,
			scriptLoading: "blocking",
			template: `${PATHS.app}/layout/pages/index.html`,
			filename: "index.html"
		})
	]
}
