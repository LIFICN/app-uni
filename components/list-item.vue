<template>
	<view hover-class="item-act" class="list-item" @click="click" :style="{height:height+'rpx'}">
		<view class="list-content">
			<text class="text-ellipsis">{{name}}</text>
		</view>
		<view class="list-right">
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	export default {
		components: {
			uniIcons
		},
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
			click() {
				this.$emit("click")
			}
		}
	}
</script>

<style>
	.list-item {
		display: flex;
		flex-direction: row;
		overflow: hidden;
		flex-wrap: nowrap;
		justify-content: flex-start;
		/* padding-left: 30rpx; */
		overflow: hidden;
		border-bottom: 0.5px solid #F1F1F1;
	}

	.item-act:active {
		background-color: #F1F1F1
	}

	.list-content {
		display: flex;
		flex: 1;
		color: #3b4144;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}

	.list-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: #999;
	}

	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
