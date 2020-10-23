<template>
	<scroll-view class="bottom-tab" scroll-with-animation scroll-x :scroll-left="scrollLeft" :style="{backgroundColor:backgroundColor}">
		<view class="flex">

			<view class="bottom-tab-item" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabSelect(index)"
			 :style="{height: height+'rpx'}">

				<view :class="item.icon" v-if="!isImage" :style="{color:(index===current?fontSelectedColor:fontColor),fontSize:textSize+'rpx'}"></view>
				<view v-if="isImage">
					<image :src="item.icon"></image>
				</view>
				<text :style="{color:(index===current?fontSelectedColor:fontColor),fontSize:textSize+'rpx'}">{{item.name}}</text>
			</view>

		</view>
	</scroll-view>
</template>
<script>
	export default {
		name: 'bottom-tab',
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
				default: 90
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
			},
			isImage: {
				type: Boolean, //图标是否为图片
				default: false
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
	/* 		scroll-view,
	view {
		box-sizing: border-box;
	} */

	.bottom-tab {
		white-space: nowrap;
	}

	.bottom-tab-item {
		flex: 1;
		padding-top: 3px;
	}

	.flex {
		display: flex;
		text-align: center;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-top: 0.2px solid #C8C7CC;
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
