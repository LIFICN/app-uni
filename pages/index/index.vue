<template>
	<view class="container" :style="{height:containerHeight+'px'}">
		<view class="content" style="display: flex;flex-direction: column;">
			<template v-if="footCurrent===0">
				<tab :current="tabCurrent" :tabList="tabList" @change="tabChange" />

				<!-- 父容器为flex布局,子容器felx:1;自适应宽高,注意flex布局方向和overflow-y设置 -->
				<swiper :current="tabCurrent" duration="300" :circular="false" indicator-color="rgba(255,255,255,0)"
				 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange" style="flex: 1;" easing-function="easeInOutCubic">
					<swiper-item v-for="(item,index) in tabList" :current="tabCurrent" :key="index" style="overflow-y: scroll;">
						<view style="text-align: center;">
							{{index}}
						</view>
					</swiper-item>
				</swiper>
			</template>

			<template v-if="footCurrent===1">
				<view style="display: flex;flex: 1;justify-content:center ;align-items: center;">
					<button @click="goToSearchPage">跳转至搜索页面</button>
				</view>
			</template>

			<template v-if="footCurrent===2">
				<list-sample style="flex:1;overflow-y: auto;" />
			</template>
		</view>

		<view>
			<bottom-tab :current="footCurrent" :tabList="footList" @change="footChange" />
		</view>
	</view>
</template>

<script>
	import {
		toDateTimeString
	} from "@/toolkit/tool.js"

	import tab from '@/components/v-tab.vue'
	import bottomTab from '@/components/bottom-tab.vue'
	import listSample from '@/components/list-sample.vue'

	export default {
		components: {
			tab,
			bottomTab,
			listSample
		},
		data() {
			return {
				tabCurrent: 0,
				footCurrent: 0,
				tabList: [{
						name: "tab1"
					},
					{
						name: "tab2"
					},
					{
						name: "tab3"
					}
				],
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
		onLoad() {},
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
			getCurrentTime() {
				let currTimestamp = Date.parse(new Date());
				return toDateTimeString(currTimestamp)
			},
			goToSearchPage() {
				uni.navigateTo({
					url: '../search-page/index',
					fail(error) {
						console.log(JSON.stringify(error))
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.content {
		flex: 1;
		overflow-y: scroll;
	}
</style>
