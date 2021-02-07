import Vue from 'vue'
import {
	toDateTimeString
} from '@/toolkit/tool.js'

Vue.prototype.$toDateTimeString = toDateTimeString

Vue.prototype.$getCurrentDate = function() {
	const date = new Date()
	let y = date.getFullYear()
	let mS = date.getMonth() + 1
	let m = mS >= 10 ? mS : `0${mS}`
	let d = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
	return `${y}-${m}-${d}`
}
