import Vue from 'vue'

Vue.prototype.$showModal = function(title, content, showCancel) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: content,
			showCancel: showCancel,
			confirmColor: "#007AFF",
			success(flag) {
				if (flag['cancel']) reject()
				else if (flag['confirm']) resolve()
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
