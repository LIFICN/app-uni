import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

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

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
