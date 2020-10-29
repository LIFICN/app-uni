<template>
	<view style="display: flex;flex-direction: column;" :style="{height:realHeight+'px'}">

		<!-- #ifdef MP-WEIXIN -->
		<wx-search-bar @input="input" @confirm="confirm" />
		<!-- #endif -->

		<view class="page-content">
			<text>搜索框内容:{{content}}</text>
		</view>
	</view>
</template>

<script>
	import wxSearchBar from '@/components/wx-search-bar.vue'

	export default {
		components: {
			wxSearchBar
		},
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
		},
		methods: {
			confirm() {
				console.log('点击了搜索按钮')
			},
			input(value) {
				this.content = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
