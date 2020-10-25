<template>
	<!-- https://ext.dcloud.net.cn/plugin?id=538 如果赶时间,直接下载别人模板改 -->
	<view class="main" :style="{height:realHeight+'px'}">

		<br>
		<view class="list-item">
			<text class="list-text">手机号</text>
			<input type="text" value="" placeholder="请输入手机号" />
		</view>
		<br>
		<view class="list-item">
			<text class="list-text">新密码</text>
			<input type="text" value="" placeholder="请输入新密码" />
		</view>
		<br>
		<view class="list-item">
			<text class="list-text">验证码</text>
			<input type="text" value="" placeholder="请输入验证码" />
			<text class="code">获取验证码</text>
		</view>
		<br>
		<button hover-class="btn-hover" class="btn">重置密码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				realHeight: this.$realHeight()
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
	}

	.list-item {
		display: flex;
		flex-direction: row;
		border: 1px solid #F1F1F1;
		border-radius: 20px;
		padding: 6px;
		width: 80%;
	}

	.list-text {
		color: #555555;
		padding-right: 4px;
		width: 100rpx;
	}

	.btn {
		font-size: 16px;
		width: 81%;
		border-radius: 30px;
		background-color: #007aff;
		color: white;
	}

	.code {
		display: flex;
		justify-items: center;
		align-items: center;
		color: #555555;
		font-size: 20rpx;
	}
</style>
