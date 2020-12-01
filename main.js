import Vue from 'vue'
import App from './App'
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import {
	toDateTimeString
} from '@/toolkit/tool.js'

Vue.config.productionTip = false

Vue.component("uni-icons", uniIcons)

var realHeight = 0 //页面高度
Vue.prototype.$realHeight = function() {
	if (realHeight === 0) {
		let sysInfo = uni.getSystemInfoSync();
		//#ifdef APP-PLUS
		realHeight = sysInfo.screenHeight - 44 - sysInfo.statusBarHeight; //屏幕实际高度-导航栏高度-状态栏高度
		//#endif
		//#ifdef H5
		realHeight = sysInfo.windowHeight - 44;
		//#endif
		//#ifdef MP-WEIXIN
		realHeight = sysInfo.windowHeight
		//#endif
	}

	return realHeight;
}

Vue.prototype.$post = function(api, params) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: api,
			data: params,
			method: "POST",
			// header: {
			// 	'content-type': 'application/x-www-form-urlencoded',
			// },
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

Vue.prototype.$showModal = function(title, content, showCancel, callback) {
	uni.showModal({
		title: title,
		content: content,
		showCancel: showCancel,
		confirmColor: "#007AFF",
		success(flag) {
			if (flag['cancel']) callback(false)
			else if (flag['confirm']) callback(true)
		},
		fail(err) {
			console.log('弹窗调用失败', err)
		}
	})
}

Vue.prototype.$toDateTimeString = toDateTimeString

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
