<template>
	<view style="display: flex;justify-content: center;align-items: center;" :style="{height:realHeight+'px'}">
		<text>搜索框内容:{{content}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				realHeight: this.$realHeight()
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

<style lang="scss" scoped>
</style>
