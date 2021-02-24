<template>
	<view class="flex-column container" :style="{height:realHeight+'px'}">
		<view class="flex-1 content" style="display: flex;flex-direction: column;">
			<template v-if="footCurrent===0">
				<tab :isScroll="true" :current="tabCurrent" :tabList="tabList" @change="tabChange" />

				<!-- 父容器为flex布局,子容器felx:1;自适应宽高,注意flex布局方向和overflow-y设置 -->
				<swiper :current="tabCurrent" style="flex: 1;" :circular="false" @change="swiperChange" duration="300"
				 easing-function="easeInOutCubic">
					<swiper-item v-for="(item,index) in tabList" :current="tabCurrent" :key="index" style="overflow-y: auto;">
						<view style="text-align: center;">{{index}}</view>
					</swiper-item>
				</swiper>
			</template>

			<template v-if="footCurrent===1">
				<view class="tab2">
					<button @click="goToPage('../search/index')">搜索页</button>
					<button @click="goToPage('../login/index')">登录页</button>
					<button @click="goToPage('../reg/index')">注册页</button>
					<button @click="goToPage('../forget/index')">忘记密码</button>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="getUserInfo" @getuserinfo="getuserinfo">获取微信小程序用户信息</button>
					<!-- #endif -->
				</view>
			</template>

			<template v-if="footCurrent===2">
				<view style="text-align: center;">{{$getCurrentDate()}}</view>
				<view style="text-align: center;">{{$DateTimeFormat(Date.now())}}</view>
			</template>
		</view>

		<view>
			<bottom-tab :current="footCurrent" :tabList="footList" @change="footChange" />
		</view>
	</view>
</template>

<script>
	import tab from '@/components/v-tab'
	import bottomTab from '@/components/bottom-tab'

	export default {
		components: {
			tab,
			bottomTab
		},
		data() {
			return {
				tabCurrent: 0,
				footCurrent: 0,
				realHeight: this.$realHeight(),
				tabList: [],
				footList: [{
						name: "Home",
						icon: "iconfont icon-shouye"
					},
					{
						name: "Me",
						icon: "iconfont icon-lianxiren"
					},
					{
						name: "Star",
						icon: "iconfont icon-xingxing"
					}
				]
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
			footChange(index) {
				this.footCurrent = index
			},
			swiperChange(e) {
				let {
					current
				} = e.detail;

				this.tabCurrent = current;
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
		overflow: hidden;
	}

	.content {
		overflow-y: auto;
	}

	.tab2 {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		:nth-child(n) {
			margin-bottom: 30rpx;
		}
	}
</style>
