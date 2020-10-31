<template>
	<!-- https://ext.dcloud.net.cn/plugin?id=538 如果赶时间,直接下载别人模板改 -->
	<view class="flex-column main" :style="{height:realHeight+'px'}">

		<view class="flex-column head">
			<image class="head-img" src="../../static/logo.png">
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" type="text" :value="phone" @input="input($event,'phone')" placeholder="请输入手机号" />
			<uni-icons v-if="phone.length>0" @click="clearInput('phone')" type="close" size="16"></uni-icons>
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" value="" :value="pwd" @input="input($event,'pwd')" placeholder="请输入密码" />
			<uni-icons v-if="pwd.length>0" @click="clearInput('pwd')" type="close" size="16"></uni-icons>
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
				setTimeout(() => {
					if (type === 'phone') {
						this.phone = ''
					} else if (type === 'pwd') {
						this.pwd = ''
					}
				}, 100)
			},
			input(e, type) {
				const v = e.target.value
				if (type === 'phone') {
					this.phone = v
				} else if (type === 'pwd') {
					this.pwd = v
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
		align-items: center;
		overflow: hidden;
	}

	.head {
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
		border: 1px solid #F1F1F1;
		border-radius: 50rpx;
		padding: 16rpx;
		width: 80%;
		margin: 20rpx;
	}

	.list-input {
		padding-right: 10rpx;
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
