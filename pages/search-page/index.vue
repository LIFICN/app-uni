<template>
	<view style="display: flex;justify-content: center;align-items: center;" :style="{height:containerHeight+'px'}">
		<text>搜索框内容:{{content}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		computed: {
			containerHeight: function() {
				var sysH = uni.getSystemInfoSync().screenHeight - 44;
				//#ifdef APP-PLUS
				var statusbarH = uni.getSystemInfoSync().statusBarHeight;
				return sysH - statusbarH;
				//#endif
				//#ifndef APP-PLUS
				return sysH;
				//#endif
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.text === '取消') {
				uni.navigateBack()
			}
		},
		onNavigationBarSearchInputChanged(e) {
			this.content = e.text
		},
		onNavigationBarSearchInputClicked() {
			//pages.json里设置"disabled":true,才会触发
			console.log('search input clicked')
		},
		onNavigationBarSearchInputConfirmed() {
			console.log('search input confired')
		}
	}
</script>

<style>
</style>
