<template>
	<view class="flex-column container" :style="{height: mainHeight+'px'}">
		<v-tab :isScroll="true" :current="tabCurrent" :tabList="tabList" @change="tabChange" />

		<swiper class="swiper" :current="tabCurrent" :circular="false" @change="swiperChange">
			<swiper-item v-for="(item,index) in tabList" :key="index" class="flex-column swiper-item">
				<view class="btn-c" v-if="index==0">
					<button @click="goToPage('../search/index')">搜索页</button>
					<button @click="goToPage('../login/index')">登录页</button>
					<button @click="goToPage('../reg/index')">注册页</button>
					<button @click="goToPage('../forget/index')">忘记密码</button>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="getUserInfo" @getuserinfo="getuserinfo">获取微信小程序用户信息</button>
					<!-- #endif -->
				</view>

				<view v-else style="text-align: center;">{{index}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import vTab from '@/components/v-tab'

	export default {
		components: {
			vTab,
		},
		computed: {
			mainHeight() {
				// #ifdef APP-PLUS
				return this.$realHeight() - 50
				// #endif
				//#ifndef APP-PLUS
				return this.$realHeight()
				//#endif
			}
		},
		data() {
			return {
				tabCurrent: 0,
				tabList: [],
			}
		},
		created() {
			for (var i = 0; i < 10; i++) {
				this.tabList.push({
					name: `tabItem-${i}`
				})
			}
		},
		methods: {
			tabChange(index) {
				this.tabCurrent = index
			},
			swiperChange(e) {
				this.tabCurrent = e.detail['current'];;
			},
			goToPage(url) {
				uni.navigateTo({
					url: url,
					fail(error) {
						console.log(error)
					}
				})
			},
			getuserinfo(res) {
				this.$showModal('test', JSON.stringify(res))
			},
			onReachBottom() {
				console.log('bottom')
			},
			onPullDownRefresh() {
				console.log('refresh')
				setTimeout(() => uni.stopPullDownRefresh(), 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;

		.swiper {
			height: 100%;
			flex: 1;
		}

		.swiper-item {
			justify-content: center;

			.btn-c {
				width: 100%;

				:nth-child(n) {
					width: 80%;
					margin-top: 30rpx;
				}
			}
		}
	}
</style>
