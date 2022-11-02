module.exports = api => ({
	plugins: [
		require("autoprefixer"),
		require("cssnano")({
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
