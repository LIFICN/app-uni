import Vue from "vue";

const getLocaltion = function() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'wgs84',
			//#ifdef APP-PLUS
			geocode: true,
			//#endif
			success(area) {
				// let coords = `${area.latitude},${area.longitude}`
				// let url =
				// 	`https://api.map.baidu.com/reverse_geocoding/v3/?ak=HiQwVOsgoVBbq0DNw6vT6WtfrPCGEc6R&output=json&coordtype=wgs84ll&location=${coords}`
				// console.log(coords)
				resolve(area)
			},
			fail(err) {
				reject(err)
			}
		})
	});
}

Vue.prototype.$getLocaltion = getLocaltion;
