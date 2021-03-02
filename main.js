import Vue from 'vue'
import App from './App'
import '@/utils/resize-height.js'
import '@/utils/date.js'
import '@/utils/request.js'
import '@/utils/localtion.js'
import '@/utils/modal.js'
import uniIcons from '@/components/uni-icons/uni-icons.vue'

Vue.config.productionTip = false

Vue.component("uni-icons", uniIcons)

App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()
