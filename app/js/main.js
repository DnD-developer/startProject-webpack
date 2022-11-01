const ter = bul => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (bul) {
				console.log("async")
				resolve()
			} else {
				reject()
			}
		}, 2000)
	})
}

async function setTime(bul) {
	try {
		await ter(bul)
		console.log("done")
	} catch (error) {
		console.log("false")
	}
}

setTime(true)
