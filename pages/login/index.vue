<template>
	<!-- https://ext.dcloud.net.cn/plugin?id=538 如果赶时间,直接下载别人模板改 -->
	<view class="main" :style="{height:realHeight+'px'}">

		<view class="head">
			<image class="head-img" src="../../static/logo.png">
		</view>

		<view class="list-item">
			<input class="list-input" type="text" v-model="phone" placeholder="请输入手机号" />
			<text v-show="phone.length>0" class="list-close" @click="clearInput('phone')">✕</text>
		</view>

		<view class="list-item">
			<input class="list-input" value="" v-model="pwd" placeholder="请输入密码" />
			<text v-show="pwd.length>0" class="list-close" @click="clearInput('pwd')">✕</text>
		</view>

		<button hover-class="btn-hover" class="btn">立即登录</button>

		<view class="tip">
			<text class="tip-right" @click="goToPage('../forget/index')">忘记密码</text>
			|
			<text class="tip-left" @click="goToPage('../reg/index')">注册账户</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				realHeight: this.$realHeight(),
				phone: '',
				pwd: ''
			}
		},
		methods: {
			goToPage(url) {
				uni.navigateTo({
					url: url,
					fail(error) {
						console.log(JSON.stringify(error))
					}
				})
			},
			clearInput(type) {
				if (type === 'phone') {
					this.phone = ''
				} else if (type === 'pwd') {
					this.pwd = ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	button::after {
		border: none;
	}

	.btn-hover {
		background-color: #0062cc !important;
	}

	.main {
		display: flex;
		align-items: center;
		flex-direction: column;
		overflow: hidden;
	}

	.head {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
		width: 161rpx;
		height: 161rpx;
	}

	.head-img {
		width: 100%;
		height: 100%;
	}

	.list-item {
		display: flex;
		flex-direction: row;
		border: 1px solid #F1F1F1;
		border-radius: 50rpx;
		padding: 16rpx;
		width: 80%;
		margin: 20rpx;
	}

	.list-input {
		flex: 1;
		padding-right: 10rpx;
	}

	.list-close {
		font-size: 12rpx;
		display: flex;
		align-items: center;
		margin-right: 10rpx;
	}

	.btn {
		font-size: 35rpx;
		width: 80%;
		border-radius: 50rpx;
		background-color: #007aff;
		color: white;
		margin: 20rpx;
	}

	.tip {
		text-align: center;
		color: #007aff;
		margin-top: 20rpx;
	}

	.tip-left {
		padding-left: 6rpx;
	}

	.tip-right {
		padding-right: 6rpx;
	}
</style>
