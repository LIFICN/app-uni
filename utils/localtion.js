import Vue from "vue";

const getLocaltion = function() {
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
	});
}

Vue.prototype.$getLocaltion = getLocaltion;
