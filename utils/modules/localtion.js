export default {
	getLocaltion() {
		return new Promise((resolve, reject) => {
			uni.getLocation({
				type: 'wgs84',
				//#ifdef APP-PLUS
				geocode: true,
				//#endif
				success(area) {
					resolve(area)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
}
