export default {
	showModal(title, content, showCancel) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: title,
				content: content,
				showCancel: showCancel || true,
				confirmColor: "#007AFF",
				success(flag) {
					if (flag['cancel']) reject()
					if (flag['confirm']) resolve()
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},
	showToast(title, duration) {
		return new Promise((resolve, reject) => {
			uni.showToast({
				title: title,
				duration: duration || 2000,
				success() {
					resolve()
				},
				fail(err) {
					reject(err)
				}
			});
		})
	}
}
