<template>
	<view class="container" :style="{height:containerHeight+'px'}">
		<view class="head">
			<span v-for="(item,index) in headList" :key="index">{{item.title}}</span>
		</view>
		<view class="content">
			内容页,当前时间:{{currDateTimeString}}
		</view>
		<view class="foot">
			<span v-for="(item,index) in footList" :key="index">{{item.title}}</span>
		</view>
	</view>
</template>

<script>
	import {
		toDateTimeString
	} from "@/toolkit/tool.js"

	export default {
		data() {
			return {
				headList: [{
						title: "head1"
					},
					{
						title: "head2"
					}
				],
				footList: [{
						title: "foot1"
					},
					{
						title: "foot2"
					}
				]
			}
		},
		computed: {
			containerHeight: function() {
				var sysH = uni.getSystemInfoSync().screenHeight;
				return sysH - 44;
			},
			currDateTimeString: function() {
				let currTimestamp = Date.parse(new Date());
				return toDateTimeString(currTimestamp)
			}
		},
		onLoad() {},
		methods: {}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.head {
		font-size: 14px;
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.head span {
		width: 50%;
		text-align: center;
		padding: 5px;
	}

	.content {
		flex: 1;
		overflow-y: scroll;
	}

	.foot {
		font-size: 14px;
		width: 100%;
		display: flex;
		flex-direction: row;
		/* flex-wrap:wrap;  //元素换行 */
		/* justify-content: space-between; */
	}

	.foot span {
		text-align: center;
		width: 50%;
		padding: 5px;
	}
</style>
