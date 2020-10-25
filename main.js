import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

var realHeight = 0 //屏幕实际高度-导航栏高度-状态栏高度
Vue.prototype.$realHeight = function() {
	if (realHeight === 0) {
		let sysInfo = uni.getSystemInfoSync();
		var height = sysInfo.screenHeight - 44;
		//#ifdef APP-PLUS
		realHeight = height - sysInfo.statusBarHeight;
		//#endif
		//#ifndef APP-PLUS
		realHeight = height;
		//#endif
	}

	return realHeight;
}

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
