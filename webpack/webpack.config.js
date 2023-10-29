const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const fs = require("fs")

const PATHS = {
	dist: path.join(__dirname, "../dist"),
	app: path.join(__dirname, "../src"),
	assets: "assets/"
}
PATHS.assetsStart = path.join(PATHS.app, "./assets")

const PAGES_DIR = `${PATHS.app}/public`
const PAGES = fs
	.readdirSync(PAGES_DIR)
	.filter(fileName => fileName.endsWith(".html") || fileName.endsWith(".pug"))

module.exports = {
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	externals: {
		paths: PATHS
	},
	entry: {
		main: PATHS.app
	},
	output: {
		filename: `${PATHS.assets}js/[name]-[contenthash].js`,
		path: PATHS.dist,
		clean: true
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
				test: /^((?!\.module).)*s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},

					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							postcssOptions: { config: path.resolve(__dirname, "../postcss.config.js") }
						}
					},

					{
						loader: "sass-loader",
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.module\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							modules: {
								localIdentName: "[local]__[sha1:hash:hex:77]"
							}
						}
					},

					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							postcssOptions: { config: path.resolve(__dirname, "../postcss.config.js") }
						}
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
					filename: `${PATHS.assets}fonts/[name]-[contenthash][ext]`
				}
			},
			{
				test: /\.(mp3)$/i,
				type: "asset/resource",
				generator: {
					filename: `${PATHS.assets}audio/[name]-[contenthash][ext]`
				}
			},
			{
				test: /\.html$/i,
				loader: "html-loader"
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name]-[contenthash].css`
		}),
		...PAGES.map(
			page =>
				new HTMLWebpackPlugin({
					hash: false,
					scriptLoading: "blocking",
					template: `${PAGES_DIR}/${page}`,
					minify: false
				})
		)
	]
}
