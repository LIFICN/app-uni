import Vue from 'vue'

Vue.prototype.$post = function(api, params) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: api,
			data: params,
			method: "POST",
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	});
}

Vue.prototype.$get = function(api, params) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: api,
			data: params,
			method: "GET",
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	});
}
