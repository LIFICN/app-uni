<template>
	<view class="flex-column flex-1 index-container">
		<v-tab :isScroll="true" :current="tabCurrent" :tabList="tabList" @change="tabChange" />

		<swiper class="flex-1 swiper" :current="tabCurrent" :circular="false" @change="swiperChange" :duration="200">
			<swiper-item v-for="(item,index) in tabList" :key="index" class="flex-column swiper-item">
				<view class="btn-c" v-if="index==0">
					<button @click="goToPage('../search/index')">搜索页</button>
					<button @click="goToPage('../login/index')">登录demo页</button>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="getUserInfo" @getuserinfo="getuserinfo">获取微信小程序用户信息</button>
					<!-- #endif -->
					<button @click="addCount()">全局状态管理 {{count}}</button>
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
			count() {
				return this.$store.state.count
			}
		},
		data() {
			return {
				tabCurrent: 0,
				tabList: [],
			}
		},
		created() {
			for (var i = 0; i < 7; i++) {
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
				this.tabCurrent = e.detail['current']
			},
			goToPage(url) {
				this.$toolkit.toPage.navigateTo(url)
			},
			getuserinfo(res) {
				this.$toolkit.tips.showModal('test', JSON.stringify(res))
			},
			onReachBottom() {
				console.log('bottom')
			},
			onPullDownRefresh() {
				console.log('refresh')
				setTimeout(() => uni.stopPullDownRefresh(), 600)
			},
			addCount() {
				this.$store.dispatch('addCount')
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
	}

	.index-container {
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
