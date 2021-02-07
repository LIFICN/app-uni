import Vue from 'vue'
import App from './App'
import '@/utils/resize-height.js'
import '@/utils/date.js'
import '@/utils/request.js'
import '@/utils/localtion.js'
const uniIcons = () => import('@/components/uni-icons/uni-icons.vue')

Vue.config.productionTip = false

Vue.component("uni-icons", uniIcons)

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

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
