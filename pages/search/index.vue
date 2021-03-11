<template>
	<view class="flex-column" :style="{height:realHeight+'px'}">

		<!-- #ifdef MP-WEIXIN -->
		<top-bar>
			<view class="flex-row title">自定义标题</view>
		</top-bar>
		<!-- #endif -->

		<view class="flex-column flex-1 page-content">
			<text>搜索框内容:{{content}}</text>
		</view>
	</view>
</template>

<script>
	import topBar from '@/components/top-bar.vue'

	export default {
		components: {
			topBar
		},
		data() {
			return {
				content: '',
				realHeight: this.$toolkit.resizeHeight.getHeight()
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
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.page-content {
		justify-content: center;
		align-items: center;
	}

	.title {
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
