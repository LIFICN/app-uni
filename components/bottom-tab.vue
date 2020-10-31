<template>
	<view class="bottom-tab">
		<scroll-view scroll-with-animation scroll-x :scroll-left="isScroll?scrollLeft:0" :style="{backgroundColor:bgColor}">
			<view class="flex-row container">

				<view class="flex-column bottom-tab-item" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabSelect(index)"
				 :style="{height: height+'rpx'}">

					<view :class="item.icon" v-if="!isImage" :style="{color:(index===current?fontSelectedColor:fontColor),fontSize:fontSize+'rpx'}"></view>
					<view v-if="isImage">
						<image :src="item.icon"></image>
					</view>
					<text :style="{color:(index===current?fontSelectedColor:fontColor),fontSize:fontSize+'rpx'}">{{item.name}}</text>
				</view>

			</view>
		</scroll-view>
	</view>
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
				default: "#0081ff"
			},
			fontSize: {
				type: [Number, String], // 字号
				default: 30
			},
			bgColor: {
				type: String, //背景色
				default: '#ffffff'
			},
			isImage: {
				type: Boolean, //图标是否为图片
				default: false
			},
			isScroll: {
				type: Boolean, //是否滑动
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

<style lang="scss" scoped>
	.bottom-tab {
		overflow: hidden;
		width: 100%;
		box-sizing: border-box;

		// 隐藏滚动条,适配全平台
		::-webkit-scrollbar {
			display: none;
		}
	}

	.container {
		border-top: 0.2px solid #C8C7CC;
		padding-top: 10rpx;
	}

	.bottom-tab-item {
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
