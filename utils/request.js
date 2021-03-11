const request = function(api, params, type) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: api,
			data: params,
			method: type,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default {
	get(api, params) {
		return request(api, params, "GET")
	},
	post(api, params) {
		return request(api, params, "POST")
	},
}
