<template>
	<div class="dashboard-container">
		<a-row :gutter="[16, 16]">
			<a-col v-for="(item, index) in chart1" :key="index" :span="6">
				<a-space :size="16" direction="vertical" class="chart1 anc-card">
					<div class="chart1-statistic">
						<AncStatistic :title="item.title" :value="item.value" :type="item.type">
							<template #prefix>
								<svg-icon :name="item.icon" :size="42"></svg-icon>
							</template>
						</AncStatistic>
					</div>
					<div class="chart1-text">
						<span v-for="(t, i) in item.text" :key="i">{{ t + (i === item.text.length - 1 ? '' : '，') }}</span>
					</div>
					<div class="chart1-chart">
						<AncChart :option="item.chart" />
					</div>
				</a-space>
			</a-col>

			<a-col :span="24">
				<div class="chart2">
					<a-tabs v-model:activeKey="chart2Key" animated class="anc-tabs">
						<a-tab-pane key="1" tab="销售额">
							<a-row :gutter="16">
								<a-col :span="18">
									<AncChart :option="chart2Option" class="chart2-chart" />
								</a-col>
								<a-col :span="6">
									<div class="chart2-rank">
										<div class="chart2-rank-title">
											<span>门店销售排行榜</span>
											<a-button class="more-btn" type="link">查看更多</a-button>
										</div>
										<div class="chart2-rank-list">
											<div v-for="item in rankList" :key="item.id" class="chart2-rank-list-item">
												<div class="chart2-rank-list-item-index">{{ item.id + '.' }}</div>
												<div class="chart2-rank-list-item-content">
													<div>{{ item.name }}</div>
													<div>{{ formatMoney(item.value) }}</div>
												</div>
											</div>
										</div>
									</div>
								</a-col>
							</a-row>
						</a-tab-pane>
						<a-tab-pane key="2" tab="访问量" force-render>Content of Tab Pane 2</a-tab-pane>
						<template #rightExtra>
							<a-segmented v-model:value="dateSegmented.value" :options="dateSegmented.options" class="date-segmented" @change="handleSegChange" />
							<a-range-picker
								v-model:value="dateRange"
								:allow-clear="false"
								format="YYYY.MM.DD"
								value-format="YYYY-MM-DD"
								class="date-range"
								@change="handleDateChange"
							/>
						</template>
					</a-tabs>
				</div>
			</a-col>
		</a-row>
		<a-row :gutter="[16, 8]"></a-row>
	</div>
</template>

<script setup lang="ts" name="Dashboard">
import { formatMoney } from '@/utils/common';
// import dayjs from 'dayjs';

/* chart1 */
const chart1 = ref([
	{
		title: '总销售额',
		icon: 'dash-pay',
		type: 'money',
		value: '126560',
		text: [`日均销售额￥${formatMoney(12423)}`],
		chart: {
			toolbox: {
				show: false,
			},
			tooltip: {
				show: true,
				trigger: 'axis',
				formatter: function (param: any) {
					return `${param[2].marker}${param[2].seriesName} &nbsp ￥<strong>${param[2].value}</strong> <br /> ${param[1].marker}${param[1].seriesName} &nbsp ￥<strong>${param[1].value}</strong> <br /> ${param[0].marker}${param[0].seriesName} &nbsp ￥<strong>${param[0].value}</strong>`;
				},
			},
			grid: {
				left: '2%',
				right: '4%',
				bottom: '0',
				top: '10%',
				// containLabel: true,
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				// data: ['08-10', '08-11', '08-12', '08-13', '08-14', '08-15', '08-16'],
			},
			yAxis: {
				type: 'value',
				splitLine: {
					show: false,
				},
			},
			series: [
				{
					name: '日均销售额',
					type: 'line',
					data: [134, 736, 200, 1200, 702, 434, 1120],
					smooth: true,
					showSymbol: false,
					lineStyle: {
						width: 1.5, //外边线宽度
						color: '#165DFF', //外边线颜色
					},
					itemStyle: {
						normal: {
							color: '#165DFF',
						},
					},
				},
				{
					name: '月均销售额',
					type: 'line',
					data: [434, 1136, 700, 1800, 1402, 1234, 2020],
					smooth: true,
					showSymbol: false,
					lineStyle: {
						width: 1.5, //外边线宽度
						color: '#F7A647', //外边线颜色
					},
					itemStyle: {
						normal: {
							color: '#F7A647',
						},
					},
				},
				{
					name: '年均销售额',
					type: 'line',
					data: [734, 1536, 1200, 2400, 2102, 2034, 3020],
					smooth: true,
					showSymbol: false,
					lineStyle: {
						width: 1.5, //外边线宽度
						color: '#1FCABC', //外边线颜色
					},
					itemStyle: {
						normal: {
							color: '#1FCABC',
						},
					},
				},
			],
		},
	},
	{
		title: '访问量',
		icon: 'dash-pointer',
		type: 'count',
		value: '8463',
		text: [`日访问量 ${formatMoney(1423)}`, `周访问量 ${formatMoney(9324)}`],
		chart: {
			toolbox: {
				show: false,
			},
			tooltip: {
				show: true,
				trigger: 'axis',
				// formatter: '{b0} &nbsp ￥<strong>{c0}</strong>',
			},
			grid: {
				left: '2%',
				right: '4%',
				bottom: '0',
				top: '10%',
				// containLabel: true,
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['2023-08-10', '2023-08-11', '2023-08-12', '2023-08-13', '2023-08-14', '2023-08-15', '2023-08-16'],
			},
			yAxis: {
				type: 'value',
				splitLine: {
					show: false,
				},
			},
			series: [
				{
					// name: '邮件营销',
					type: 'line',
					data: [134, 736, 200, 1200, 702, 434, 1120],
					smooth: true,
					showSymbol: false,
					lineStyle: {
						width: 1.5, //外边线宽度
						color: '#F7A647', //外边线颜色
					},
					itemStyle: {
						normal: {
							color: '#FFC685',
						},
					},
					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: '#FFC685', // 0% 处的颜色
								},

								{
									offset: 1,
									color: '#ffffff', // 100% 处的颜色
								},
							],
							global: false,
						},
					},
				},
			],
		},
	},
	{
		title: '支付笔数',
		icon: 'dash-message',
		type: 'count',
		value: 13476,
		text: [`日支付笔数 ${formatMoney(3397)}`],
		chart: {
			tooltip: {
				show: true,
				trigger: 'axis',
				// formatter: '{b0} &nbsp ￥<strong>{c0}</strong>',
			},
			grid: {
				left: '2%',
				right: '4%',
				bottom: '0',
				top: '10%',
				// containLabel: true,
			},
			xAxis: {
				data: ['2023-08-10', '2023-08-11', '2023-08-12', '2023-08-13', '2023-08-14', '2023-08-15', '2023-08-16'],
			},
			yAxis: {
				splitLine: {
					show: false,
				},
			},
			series: [
				{
					type: 'candlestick',
					showSymbol: true,
					itemStyle: {
						normal: {
							color: '#8289F5',
							color0: '#8289F5',
							borderColor: '#8289F5',
							borderColor0: '#8289F5',
						},
					},
					name: '支付笔数',
					data: [
						[20, 34, 10, 38],
						[40, 35, 30, 50],
						[31, 38, 33, 44],
						[38, 15, 5, 42],
						[20, 34, 10, 38],
						[40, 35, 30, 50],
						[40, 35, 30, 50],
					],
				},
			],
		},
	},
	{
		title: '线上购物转化率',
		icon: 'dash-online',
		type: 'percentage',
		value: '78',
		text: ['日环比 24%', '周环比 46%'],
		chart: {
			grid: {
				// 让图表占满容器
				top: '0px',
				left: '0px',
				right: '0px',
				bottom: '0px',
			},
			series: [
				{
					type: 'gauge',
					min: 0, //最大值
					max: 100, //最小值
					startAngle: 180, //仪表盘起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
					endAngle: 0, //仪表盘结束角度
					splitNumber: 100, //仪表盘刻度的分割段数
					center: ['50%', '80%'],
					radius: '150%',
					itemStyle: {
						color: '#1FCABC', //颜色
						// shadowColor: 'rgba(0,138,255,0.45)', //阴影颜色
						// shadowBlur: 10, //图形阴影的模糊大小
						// shadowOffsetX: 2, //阴影水平方向上的偏移距离
						// shadowOffsetY: 2, //阴影垂直方向上的偏移距离
					},
					progress: {
						show: true, //是否显示进度条
						roundCap: true, //是否在两端显示成圆形
						width: 10, //进度条宽度
					},
					pointer: {
						show: false, //是否显示指针
					},
					axisLine: {
						show: true, //是否显示仪表盘轴线
						roundCap: true, //是否在两端显示成圆形
						lineStyle: {
							width: 10, //轴线宽度
						},
					},
					axisTick: {
						show: false, //是否显示刻度
					},
					splitLine: {
						show: false, //是否显示分隔线
					},
					axisLabel: {
						show: false, //是否显示标签
					},
					title: {
						show: true, //是否显示标题
					},
					detail: {
						show: true, //是否显示详情
						valueAnimation: true, //是否开启标签的数字动画
						width: '60%', //详情宽度
						lineHeight: 40, //行高
						borderRadius: 8, //文字块的圆角
						offsetCenter: [0, '-10%'], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比
						fontSize: 28, //文字的字体大小
						fontWeight: 'bolder', //文字字体的粗细
						formatter: (param: number) => {
							return param + '%';
						}, //格式化函数或者字符串
						color: 'auto', //文本颜色
					},
					data: [
						{
							value: 78,
						},
					],
				},
			],
		},
	},
]);

/* chart2 */
const chart2Key = ref('1');
const dateSegmented = ref({
	value: 0,
	options: [
		{
			label: '今日',
			value: 1,
		},
		{
			label: '本周',
			value: 2,
		},
		{
			label: '本月',
			value: 3,
		},
		{
			label: '全年',
			value: 4,
		},
	],
});
const dateRange = ref([]);
const rankList = ref([
	{
		id: 1,
		name: '公转路一号店',
		value: 323234,
	},
	{
		id: 2,
		name: '北大桥二号店',
		value: 283243,
	},
	{
		id: 3,
		name: '中关村桥三号',
		value: 204244,
	},
	{
		id: 4,
		name: '三里桥四号店',
		value: 123423,
	},
	{
		id: 5,
		name: '动物园五号店',
		value: 92323,
	},
]);
const chart2Option = ref({
	title: {
		text: '销售额趋势',
		textStyle: {
			fontWeight: 'normal',
			fontSize: '16px',
			lineHeight: '34',
		},
	},
	tooltip: {
		show: true,
		trigger: 'axis',
	},
	grid: {
		top: '20%',
		bottom: '8%',
	},
	xAxis: {
		type: 'category',
		data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		axisTick: {
			show: false,
		},
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [120, 200, 150, 80, 70, 110, 130],
			type: 'bar',
			barMaxWidth: 20,
			itemStyle: {
				color: 'rgb(22, 93, 255)',
			},
		},
	],
});
const handleSegChange = (value: number) => {
	console.log(value);
};
const handleDateChange = (dates: any, dateStrings: [string, string]) => {
	console.log(dates, dateStrings);
	console.log(dateRange.value);
};
onMounted(() => {});
</script>

<style lang="scss" scoped>
.dashboard-container {
	.chart1 {
		width: 100%;
		&-text {
			font-size: 16px;
		}
		&-chart {
			width: 100%;
			height: 100px;

			// background-color: indianred;
		}
	}
	.chart2 {
		width: 100%;
		.date-segmented {
			margin-right: 30px;
			&:deep(.ant-segmented-item-selected) {
				color: #fff;
				background-color: $color-theme;
			}
			&:deep(.ant-segmented-thumb) {
				background-color: $color-theme;
			}
		}
		.date-range {
			&:deep(.ant-picker-input) {
				width: 80px;
			}
		}
		&-chart {
			height: 340px;
		}
		&-rank {
			&-title {
				font-size: 16px;
				line-height: 40px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			&-list {
				&-item {
					display: flex;
					margin: 16px 0;
					&-index {
						padding: 10px 15px;
					}
					&-content {
						flex: 1;
						display: flex;
						justify-content: space-between;
						padding: 10px 15px;
						color: $color-text-3;
						background-color: $color-bg;
					}
				}
			}
		}
	}
}
</style>
