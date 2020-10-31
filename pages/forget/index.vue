<template>
	<!-- https://ext.dcloud.net.cn/plugin?id=538 如果赶时间,直接下载别人模板改 -->
	<view class="flex-column main" :style="{height:realHeight+'px'}">

		<view class="flex-row list-item">
			<input class="flex-1 list-input" type="text" :value="phone" @input="input($event,'phone')" placeholder="请输入手机号" />
			<uni-icons v-if="phone.length>0" @click="clearInput('phone')" type="close" size="16"></uni-icons>
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" :value="pwd" @input="input($event,'pwd')" placeholder="请输入新密码" />
			<uni-icons v-if="pwd.length>0" @click="clearInput('pwd')" type="close" size="16"></uni-icons>
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" :value="code" @input="input($event,'code')" placeholder="请输入短信验证码" />
			<uni-icons v-if="code.length>0" @click="clearInput('code')" type="close" size="16" style="margin-right: 3px;"></uni-icons>
			<text class="flex-row code" @click="sendCode" :style="{color: [sendCodeInterval>0?'gray':'#007aff']}">
				{{sendCodeInterval>0 ?`${sendCodeInterval}s`:'获取验证码'}}
			</text>
		</view>

		<button hover-class="btn-hover" class="btn">重置密码</button>
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
			},
			input(e, type) {
				const v = e.target.value
				if (type === 'phone') {
					this.phone = v
				} else if (type === 'pwd') {
					this.pwd = v
				} else if (type === 'code') {
					this.code = v
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

	.code {
		justify-content: center;
		align-items: center;
		color: #555555;
		font-size: 25rpx;
	}
</style>
