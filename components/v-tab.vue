<template>
	<scroll-view class="v-tab" scroll-with-animation scroll-x :scroll-left="scrollLeft" :style="{backgroundColor:backgroundColor}">
		<view class="flex">

			<view class="v-tab-item" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabSelect(index)">
				<text :style="{color:(index===current?fontSelectedColor:fontColor),fontSize:textSize+'rpx',lineHeight: height+'rpx'}">{{item.name}}</text>
				<view :style="{height:barHeight+'rpx'}" :class="[current==index?barBgColor:'']"></view>
			</view>

		</view>
	</scroll-view>
</template>
<script>
	export default {
		name: 'v-tab',
		data() {
			return {};
		},
		props: {
			tabList: {
				type: Array, // tab数组
				default () {
					return [];
				}
			},
			current: {
				type: [Number, String], // 当前活动tab的下标
				default () {
					return 0;
				}
			},
			height: {
				type: [Number, String], // 高度
				default: 88
			},
			barHeight: {
				type: [Number, String], // 底栏高度
				default: 6
			},
			barBgColor: {
				type: String, //底栏颜色
				default: "bg-blue"
			},
			fontColor: {
				type: String, //字体颜色
				default: "black"
			},
			fontSelectedColor: {
				type: String, //选中字体颜色
				default: "#3A86FB"
			},
			textSize: {
				type: [Number, String], // 字号
				default: 30
			},
			backgroundColor: {
				type: String, //背景色
				default: '#ffffff'
			}
		},
		methods: {
			tabSelect(index) {
				this.$emit('change', index);
			}
		},
		computed: {
			scrollLeft() {
				return (this.current - 1) * 60;
			}
		}
	};
</script>

<style>
	/* 	scroll-view,
	view {
		box-sizing: border-box;
	} */

	.v-tab {
		white-space: nowrap;
	}

	.v-tab-item {
		flex: 1;
		margin: 0 10upx;
		padding: 0 20upx;
	}

	.flex {
		display: flex;
		text-align: center;
		flex-direction: row;
	}

	.text-blue {
		color: #0081ff;
	}

	.text-white {
		color: #ffffff;
	}

	.bg-white {
		background-color: #ffffff;
	}

	.bg-blue {
		background-color: #0081ff;
	}
</style>
