<template>
	<!-- https://ext.dcloud.net.cn/plugin?id=538 如果赶时间,直接下载别人模板改 -->
	<view class="main" :style="{height:realHeight+'px'}">

		<view class="head">
			<image class="head-img" src="../../static/logo.png">
		</view>

		<view class="list-item">
			<input class="list-input" type="text" v-model="phone" placeholder="请输入手机号" />
			<view v-if="phone.length>0" class="list-close" @click="clearInput('phone')">✕</view>
		</view>

		<view class="list-item">
			<input class="list-input" value="" v-model="pwd" placeholder="请输入密码" />
			<view v-if="pwd.length>0" class="list-close" @click="clearInput('pwd')">✕</view>
		</view>

		<view class="list-item">
			<input class="list-input" v-model="code" placeholder="请输入短信验证码" />
			<view v-if="code.length>0" class="list-close" @click="clearInput('code')">✕</view>
			<text class="code" @click="sendCode" :style="{color: [sendCodeInterval>0?'gray':'#007aff']}">
				{{sendCodeInterval>0 ?`${sendCodeInterval}s`:'获取验证码'}}
			</text>
		</view>

		<button hover-class="btn-hover" class="btn">立即注册</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				realHeight: this.$realHeight(),
				phone: '',
				pwd: '',
				code: '',
				sendCodeInterval: 0
			}
		},
		methods: {
			clearInput(type) {
				setTimeout(() => {
					if (type === 'phone') {
						this.phone = ''
					} else if (type === 'pwd') {
						this.pwd = ''
					} else if (type === 'code') {
						this.code = ''
					}
				}, 100)
			},
			sendCode() {
				var that = this
				if (that.sendCodeInterval === 0) {
					var intervalId = setInterval(() => {
						that.sendCodeInterval++
						if (that.sendCodeInterval >= 60) {
							that.sendCodeInterval = 0
							clearInterval(intervalId)
							console.log('定时器已清除')
						}
					}, 1000);
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
		font-size: 25rpx;
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

	.code {
		display: flex;
		justify-items: center;
		align-items: center;
		color: #555555;
		font-size: 25rpx;
	}
</style>
