// @ts-ignore
const autoprefixer = require("autoprefixer")
// @ts-ignore
const cssnano = require("cssnano")

module.exports = () => ({
	plugins: [
		autoprefixer,
		cssnano({
			preset: [
				"default",
				{
					discardComments: {
						removeAll: true
					}
				}
			]
		})
	]
})
