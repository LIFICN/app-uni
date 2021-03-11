import Vue from 'vue'
import App from './App'
import toolkit from '@/utils/index.js'
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$toolkit = toolkit
Vue.prototype.$store = store

Vue.component("uni-icons", uniIcons)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
