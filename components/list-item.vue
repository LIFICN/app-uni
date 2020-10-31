<template>
	<view hover-class="item-act" class="flex-row list-item" @tap="tap" :style="{height:height+'rpx'}">
		<view class="flex-row flex-1 list-content">
			<text class="text-ellipsis">{{name}}</text>
		</view>
		<view class="flex-row list-right">
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String, //名称
				default: ''
			},
			height: {
				type: [Number, String], //高度
				default: 80
			}
		},
		data() {
			return {};
		},
		methods: {
			tap() {
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-item {
		flex-wrap: nowrap;
		justify-content: flex-start;
		overflow: hidden;
		border-bottom: 0.5px solid #F1F1F1;
	}

	.item-act:active {
		background-color: #F1F1F1
	}

	.list-content {
		align-items: center;
		color: #3b4144;
		overflow: hidden;
	}

	.list-right {
		justify-content: flex-end;
		align-items: center;
		color: #999;
	}

	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis; //flex布局时,父容器必须添加overflow: hidden;,才会生效,大坑!
		white-space: nowrap;
	}
</style>
