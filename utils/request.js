import Vue from 'vue'

const request = function(api, params, type) {
	return new Promise(function(resolve, reject) {
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
	});
}

Vue.prototype.$post = function(api, params) {
	request(api, params, "POST")
}

Vue.prototype.$get = function(api, params) {
	request(api, params, "GET")
}
