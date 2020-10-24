<template>
	<!-- @touchmove.stop.prevent是为了阻止手机默认的滑动事件 -->
	<view @touchmove.stop.prevent>
		<hr-pull-load @refresh='refresh' @loadMore='loadMore' :height='-1' :pullHeight='50' :maxHeight='100' :lowerThreshold='20'
		 :bottomTips='bottomTips' :isAllowPull="true" :isTab='false' ref='hrPullLoad'>
			<!-- 插入自己的数据-->
			<view style="text-align: center; margin-top: 10px;">下拉刷新，上拉加载测试</view>
			<view class="list" v-for="(item,index) in exampleInfo" :key='index'>
				<list-item :name="item.name+'-'+index" @click="listItemClick(index)" :key="index" />
			</view>
		</hr-pull-load>
	</view>
</template>

<script>
	//https://ext.dcloud.net.cn/plugin?id=2456 刷新组件地址
	import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue';
	import listItem from '@/components/list-item.vue';

	export default {
		data() {
			return {
				exampleInfo: [],
				bottomTips: '',
			}
		},
		components: {
			hrPullLoad,
			listItem
		},
		onLoad() {
			this.getExampleData(1);
		},
		methods: {
			/*
			调用接口从后台获取数据，这里的逻辑处理大家可以参考，具体的处理大家可以自定义，需要注意的是：
			1.bottomTips用来控制触发加载更多时的底部提示
			2.this.$refs.hrPullLoad.reSet()用来重置下拉刷新状态
			*/
			getExampleData(type) {
				/* type 1代表下拉刷新 2代表加载更多 */

				if (type === 1) {
					let array = [];
					for (var i = 0; i < 20; i++) {
						let item = {
							name: '派大星和海绵宝宝'
						}
						array.push(item);
					}

					this.exampleInfo = array;
				} else if (type === 2) {
					if (this.exampleInfo.length >= 100) {
						this.bottomTips = "nomore" //最后一页
					} else {
						//延迟执行,模拟请求耗时
						setTimeout(() => {
							for (var i = 0; i < 10; i++) {
								let item = {
									name: '派大星和海绵宝宝'
								}
								this.exampleInfo.push(item);
							}
						}, 500)
					}
				}

				//移除动画
				setTimeout(() => {
					this.$refs.hrPullLoad.reSet();
				}, 300);
			},
			//自定义上拉加载更多
			loadMore() {
				this.bottomTips = 'loading' //打开动画
				this.getExampleData(2);
			},
			//自定义下拉刷新
			refresh() {
				this.getExampleData(1);
			},
			listItemClick(index) {
				console.log(`${index} list-item clicked`)
			}
		},
	}
</script>
