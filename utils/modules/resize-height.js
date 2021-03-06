let realHeight = 0 //页面高度

export default {
	getHeight() {
		if (realHeight === 0) {
			const titleBarHeight = 44
			const {
				screenHeight,
				windowHeight,
				statusBarHeight
			} = uni.getSystemInfoSync();

			//#ifdef APP-PLUS
			realHeight = screenHeight - titleBarHeight - statusBarHeight; //屏幕实际高度-导航栏高度-状态栏高度
			//#endif
			//#ifndef APP-PLUS
			realHeight = windowHeight
			//#endif
		}

		return realHeight;
	}
}
