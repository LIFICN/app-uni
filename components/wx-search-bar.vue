<template>
	<view class="search-main">
		<view :style="{height:statusBarHeight+'px'}"></view>
		<view class="search-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
			<uni-icons type="arrowleft" size="18" @click="back"></uni-icons>
			<view class="search">
				<input class="search-input" type="text" v-model="content" placeholder="请输入您需要的内容" @input="input" @confirm="confirm" />
				<text v-if="content.length>0" class="search-close" @click="clearSearchInput">✕</text>
			</view>
		</view>


		<!-- 需要添加占位符高度  状态栏高度+导航栏高度（否则下面tab会塌陷）-->
		<!-- <view :style="{height: statusBarHeight+navBarHeight+'px'}"></view> -->
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons
		},
		props: {},
		data() {
			return {
				statusBarHeight: 20, // 状态栏高度 
				navBarHeight: 45, //导航栏高度,
				windowWidth: 375, //窗口宽度
				content: ''
			}
		},
		methods: {
			clearSearchInput() {
				this.content = ''
				setTimeout(() => { //延迟触发,小程序下巨坑
					this.$emit("input", '')
				}, 100)
			},
			input(e) {
				this.$emit("input", e.target.value)
			},
			confirm() {
				this.$emit("confirm")
			},
			back() {
				uni.navigateBack()
			}
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// 除了h5 app mp-alipay的情况下执行
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.search-main {
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
	}

	.search-content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	.search {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid #999999;
		border-radius: 30px;
		width: 100%;
		margin: 6px;
	}

	.search-input {
		flex: 1;
		margin-left: 10px;
		margin-right: 8px;
		height: 25px;
	}

	.search-close {
		font-size: 30rpx;
		display: flex;
		align-items: center;
		margin-right: 10px;
	}
</style>
