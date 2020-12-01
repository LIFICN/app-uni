<template>
	<view class="calendar-wrapper" style="border-radius: 0px 0px 10px 10px">
		<view class="header" v-if="headerBar">
			<uni-icons type="arrowleft" size="16" class="pre" @click="changeMonth('pre')"></uni-icons>
			<view style="color: #f66890;">{{y+'年'+formatNum(m)+'月'}}</view>
			<uni-icons type="arrowright" size="16" class="next" @click="changeMonth('next')"></uni-icons>
		</view>
		<view class="week">
			<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
		</view>
		<view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }">
			<view :style="{ top: positionTop + 'rpx' }" class="days">
				<view class="item" v-for="(item, index) in dates" :key="index">
					<view class="day" @click="selectOne(item, $event)" :class="{
                            choose: choose == `${item.year}-${item.month}-${item.date}`&&item.isCurM,
                            nolm: !item.isCurM,
                            today: isToday(item.year, item.month, item.date),
						    isWorkDay:isWorkDay(item.year, item.month, item.date)
                        }">
						{{ Number(item.date) }}
					</view>
					<view class="startDay" v-if="isStartDay(item.year, item.month, item.date)&&isRange&&item.isCurM"></view>
					<view class="rangeDay" v-if="isRangeDay(item.year, item.month, item.date)&&isRange&&item.isCurM&&!isStartDay(item.year, item.month, item.date)"></view>
					<view class="markDay" v-if="isMarkDay(item.year, item.month, item.date)&&item.isCurM"></view>
					<!-- <view class="today-text" v-if="isToday(item.year, item.month, item.date)">今</view> -->
				</view>
			</view>
		</view>
		<image src="../static/img/calendararrow.png" mode="scaleToFill" v-if="collapsible" @click="toggle" class="weektoggle"
		 :class="{ down: monthOpen }">
		</image>
	</view>
</template>

<script>
	export default {
		name: 'ren-calendar',
		props: {
			// 星期几为第一天(0为星期日)
			weekstart: {
				type: Number,
				default: 0
			},
			// 标记的日期
			markDays: {
				type: Array,
				default: () => {
					return [];
				}
			},
			//是否展示月份切换按钮
			headerBar: {
				type: Boolean,
				default: true
			},
			// 是否展开
			open: {
				type: Boolean,
				default: true
			},
			//是否可收缩
			collapsible: {
				type: Boolean,
				default: true
			},
			//未来日期是否不可点击
			disabledAfter: {
				type: Boolean,
				default: false
			},
			isRange: { //是否多选日期
				type: Boolean,
				default: false
			},
			outRangeDays: { //标记日期跨度
				type: Array,
				default () {
					return []
				}
			},
			startYear: { //开始年限
				type: Number,
				default: 2020
			}
		},
		watch: {
			outRangeDays: {
				immediate: true,
				deep: true,
				handler(newV, oldV) {
					this.selectedRange = newV
				}
			}
		},
		data() {
			return {
				weektext: ['日', '一', '二', '三', '四', '五', '六'],
				y: new Date().getFullYear(), // 年
				m: new Date().getMonth() + 1, // 月
				dates: [], // 当前月的日期数据
				positionTop: 0,
				monthOpen: true,
				choose: '',
				selectedRange: []
			};
		},
		created() {
			this.dates = this.monthDay(this.y, this.m);
			!this.open && this.toggle();
		},
		mounted() {
			this.choose = this.getToday().date;
		},
		computed: {
			// 顶部星期栏
			weekDay() {
				return this.weektext.slice(this.weekstart).concat(this.weektext.slice(0, this.weekstart));
			},
			height() {
				return (this.dates.length / 7) * 60 + 'rpx';
			}
		},
		methods: {
			formatNum(num) {
				let res = Number(num);
				return res < 10 ? '0' + res : res;
			},
			getToday() {
				let date = new Date();
				let y = date.getFullYear();
				let m = date.getMonth();
				let d = date.getDate();
				let week = new Date().getDay();
				let weekText = ['日', '一', '二', '三', '四', '五', '六'];
				let formatWeek = '星期' + weekText[week];
				let today = {
					date: y + '-' + this.formatNum(m + 1) + '-' + this.formatNum(d),
					week: formatWeek
				};
				return today;
			},
			// 获取当前月份数据
			monthDay(y, month) {
				let dates = [];
				let m = Number(month);
				let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
				let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
				let lastDayOfLastMonth = new Date(y, m - 2, 0).getDate(); // 上一月的最后一天
				let weekstart = this.weekstart == 7 ? 0 : this.weekstart;
				let startDay = (() => {
					// 周初有几天是上个月的
					if (firstDayOfMonth == weekstart) {
						return 0;
					} else if (firstDayOfMonth > weekstart) {
						return firstDayOfMonth - weekstart;
					} else {
						return 7 - weekstart + firstDayOfMonth;
					}
				})();
				let endDay = 7 - ((startDay + lastDateOfMonth) % 7); // 结束还有几天是下个月的
				for (let i = 1; i <= startDay; i++) {
					dates.push({
						date: this.formatNum(lastDayOfLastMonth - startDay + i),
						day: weekstart + i - 1 || 7,
						month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
						year: m - 1 >= 0 ? y : y - 1
					});
				}
				for (let j = 1; j <= lastDateOfMonth; j++) {
					dates.push({
						date: this.formatNum(j),
						day: (j % 7) + firstDayOfMonth - 1 || 7,
						month: this.formatNum(m),
						year: y,
						isCurM: true //是否当前月份
					});
				}
				for (let k = 1; k <= endDay; k++) {
					dates.push({
						date: this.formatNum(k),
						day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
						month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
						year: m + 1 <= 11 ? y : y + 1
					});
				}
				// console.log(dates);
				return dates;
			},
			isWorkDay(y, m, d) {
				//是否工作日
				let ymd = `${y}/${m}/${d}`;
				let formatDY = new Date(ymd.replace(/-/g, '/'));
				let week = formatDY.getDay();
				if (week == 0 || week == 6) {
					return false;
				} else {
					return true;
				}
			},
			isFutureDay(y, m, d) {
				//是否未来日期
				let ymd = `${y}/${m}/${d}`;
				let formatDY = new Date(ymd.replace(/-/g, '/'));
				let showTime = formatDY.getTime();
				let curTime = new Date().getTime();
				if (showTime > curTime) {
					return true;
				} else {
					return false;
				}
			},
			// 标记日期
			isMarkDay(y, m, d) {
				let flag = false;
				let dy = `${y}-${m}-${d}`;

				for (let i = 0; i < this.markDays.length; i++) {
					if (this.markDays[i] == dy) {
						flag = true;
						break;
					}
				}

				return flag;
			},
			isToday(y, m, d) {
				let checkD = y + '-' + m + '-' + d;
				let today = this.getToday().date;
				if (checkD == today) {
					return true;
				} else {
					return false;
				}
			},
			// 展开收起
			toggle() {
				this.monthOpen = !this.monthOpen;
				if (this.monthOpen) {
					this.positionTop = 0;
				} else {
					let index = -1;
					this.dates.forEach((i, x) => {
						this.isToday(i.year, i.month, i.date) && (index = x);
					});
					this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 60;
				}
			},
			// 点击回调
			selectOne(i, event) {
				let date = `${i.year}-${i.month}-${i.date}`;
				let selectD = new Date(date).getTime();
				let curTime = new Date().getTime();
				let week = new Date(date).getDay();
				let weekText = ['日', '一', '二', '三', '四', '五', '六'];
				let formatWeek = '星期' + weekText[week];
				let response = {
					date: date,
					week: formatWeek
				};
				if (!i.isCurM) {
					// console.log('不在当前月范围内');
					return false;
				}
				if (selectD > curTime) {
					if (this.disabledAfter) {
						console.log('未来日期不可选');
						return false;
					} else {
						this.choose = date;
						this.$emit('onDayClick', response);
						if (this.isRange) {
							this.selectdDayRange(response.date);
							this.$emit('onRangeClick', this.selectedRange)
						}
					}
				} else {
					this.choose = date;
					this.$emit('onDayClick', response);
					if (this.isRange) {
						this.selectdDayRange(response.date);
						this.$emit('onRangeClick', this.selectedRange)
					}
				}
			},
			//改变年月
			changYearMonth(y, m) {
				this.dates = this.monthDay(y, m);
				this.y = y;
				this.m = m;
			},
			changeMonth(type) {

				if (this.y <= this.startYear && this.m <= 1 && type == 'pre') return;

				if (type == 'pre') {
					if (this.m + 1 == 2) {
						this.m = 12;
						this.y = this.y - 1;
					} else {
						this.m = this.m - 1;
					}
				} else {
					if (this.m + 1 == 13) {
						this.m = 1;
						this.y = this.y + 1;
					} else {
						this.m = this.m + 1;
					}
				}
				this.dates = this.monthDay(this.y, this.m);
			},
			isRangeDay(y, m, d) {
				if (this.selectedRange.length != 2) return false;

				let dy = `${y}-${m}-${d}`;
				let mDayDown = this.selectedRange.slice().sort((a, b) => Date.parse(a) - Date.parse(b))
				let mDayStart = Date.parse(mDayDown[0])
				let mDayEnd = Date.parse(mDayDown[mDayDown.length - 1])
				let dyDate = Date.parse(dy)
				if (dyDate >= mDayStart && dyDate <= mDayEnd) {
					return true
				}
				return false
			},
			selectdDayRange(e) {
				//日历控件多选,只记录开始，结束日期
				if (this.selectedRange.length >= 2) {
					this.selectedRange = [e]
				} else {
					this.selectedRange.push(e)
					this.selectedRange = this.selectedRange.slice().sort((a, b) => Date.parse(a) - Date.parse(b)) //时间排序
				}
			},
			isStartDay(y, m, d) {
				if (this.selectedRange.length == 0) return false;

				let dy = `${y}-${m}-${d}`;
				let mDayDown = this.selectedRange.slice().sort((a, b) => Date.parse(a) - Date.parse(b))
				let mDayStart = Date.parse(mDayDown[0])
				let dyDate = Date.parse(dy)
				if (dyDate == mDayStart) {
					return true
				}
				return false
			},
		}
	};
</script>

<style lang="scss" scoped>
	.calendar-wrapper {
		color: #bbb7b7;
		font-size: 24rpx;
		text-align: center;
		background-color: #fff;
		padding-bottom: 10rpx;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60rpx;
			color: #42464A;
			font-size: 30rpx;
			border-bottom: 2rpx solid #f2f2f2;

			.pre,
			.next {
				color: #4d7df9;
				font-size: 24rpx;
				font-weight: normal;
				padding: 8rpx 15rpx;
				border-radius: 10rpx;
			}

			.pre {
				margin-right: 30rpx;
			}

			.next {
				margin-left: 30rpx;
			}
		}

		.week {
			display: flex;
			align-items: center;
			height: 60rpx;
			line-height: 60rpx;
			border-bottom: 1rpx solid rgba(255, 255, 255, 0.2);

			view {
				flex: 1;
			}
		}

		.content {
			position: relative;
			overflow: hidden;
			transition: height 0.4s ease;

			.days {
				transition: top 0.3s;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				position: relative;

				.item {
					position: relative;
					display: block;
					height: 60rpx;
					line-height: 60rpx;
					width: calc(100% / 7);

					.day {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						width: 50rpx;
						height: 50rpx;
						line-height: 50rpx;
						overflow: hidden;
						border-radius: 50rpx;

						&.choose {
							background-color: #f66890;
							color: #fff;
						}

						&.nolm {
							color: white;
							opacity: 0.3;
						}
					}

					.isWorkDay {
						color: #42464a;
					}

					.notSigned {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #fa7268;
						border-radius: 10rpx;
						position: absolute;
						left: 45%;
						bottom: 0;
						pointer-events: none;
					}

					.today {
						color: #fff;
						background-color: pink;
					}

					.workDay {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #4d7df9;
						border-radius: 10rpx;
						position: absolute;
						left: 45%;
						bottom: 0;
						pointer-events: none;
					}

					.markDay {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #007AFF;
						border-radius: 10rpx;
						position: absolute;
						left: 45%;
						bottom: 0;
						pointer-events: none;
					}

					.rangeDay {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #fc7a64;
						border-radius: 10rpx;
						position: absolute;
						left: 45%;
						bottom: 0;
						pointer-events: none;
					}

					.startDay {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #007AFF;
						border-radius: 10rpx;
						position: absolute;
						left: 45%;
						bottom: 0;
						pointer-events: none;
					}
				}
			}
		}

		.hide {
			height: 60rpx !important;
		}

		.weektoggle {
			width: 85rpx;
			height: 32rpx;
			position: relative;
			bottom: -42rpx;

			&.down {
				transform: rotate(180deg);
				bottom: 0;
			}
		}

		.range-color {
			background-color: #f66890 !important;
			color: white !important;
		}
	}
</style>
