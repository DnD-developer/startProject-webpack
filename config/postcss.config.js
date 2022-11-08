const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")

module.exports = api => ({
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
