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
									<AncChart ref="ancChart2" :option="chart2Option" class="chart2-chart" />
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
						<a-tab-pane key="2" tab="访问量">
							<a-row :gutter="16">
								<a-col :span="18">
									<AncChart ref="ancChart3" :option="chart3Option" class="chart2-chart" />
								</a-col>
								<a-col :span="6">
									<div class="chart2-rank">
										<div class="chart2-rank-title">
											<span>门店访问排行榜</span>
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
						<template #rightExtra>
							<a-segmented v-model:value="dateSegmented.value" :options="dateSegmented.options" @change="handleSegChange" />
							<a-range-picker
								v-model:value="dateRange"
								:allow-clear="false"
								format="YYYY.MM.DD"
								value-format="YYYY-MM-DD"
								class="date-range"
								:disabled="true"
								@change="handleDateChange"
							/>
						</template>
					</a-tabs>
				</div>
			</a-col>

			<a-col :span="12">
				<a-space :size="16" direction="vertical" class="chart4 anc-card">
					<div class="chart4-title">线上热门搜索</div>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-statistic title="搜索用户数" :value="22560" class="chart4-statistic">
								<template #suffix>
									本周
									<span class="suffix-count-up">48% <RiseOutlined /></span>
								</template>
							</a-statistic>
						</a-col>
						<a-col :span="12">
							<a-statistic title="人均搜索次数" :value="2.7" :precision="1" class="chart4-statistic">
								<template #suffix>
									本周
									<span class="suffix-count-down">32% <FallOutlined /></span>
								</template>
							</a-statistic>
						</a-col>
					</a-row>
					<div class="chart4-chart">
						<AncChart :option="chart4Option" />
					</div>
				</a-space>
			</a-col>
			<a-col :span="12">
				<a-space :size="16" direction="vertical" class="chart5 anc-card">
					<div class="chart5-title">
						<div>销售额类别占比</div>
						<a-segmented v-model:value="chart5Segmented.value" :options="chart5Segmented.options" />
					</div>

					<div class="chart5-chart">
						<AncChart :option="chart5Option" />
					</div>
				</a-space>
			</a-col>
			<a-col :span="18">
				<a-space :size="16" direction="vertical" class="chart6 anc-card">
					<div class="chart6-title">活动实时交易情况</div>
					<a-row :gutter="16">
						<a-col :span="6">
							<a-statistic title="今日交易总额（元）" :value="126560" class="chart6-statistic"> </a-statistic>
						</a-col>
						<a-col :span="6">
							<a-statistic title="销售目标完成率" value="90%" class="chart6-statistic"> </a-statistic>
						</a-col>
						<a-col :span="6">
							<a-statistic-countdown title="活动时间剩余" :value="chart6Deadline" class="chart6-statistic"> </a-statistic-countdown>
						</a-col>
						<a-col :span="6">
							<a-statistic title="每秒交易总额（元）" value="234" class="chart6-statistic"> </a-statistic>
						</a-col>
					</a-row>
					<div class="chart6-chart">
						<AncChart :option="chart6Option" />
					</div>
				</a-space>
			</a-col>
			<a-col :span="6">
				<a-space :size="16" direction="vertical" style="width: 100%">
					<a-space :size="16" direction="vertical" class="chart7 anc-card">
						<div class="anc-card-title">优惠活动占比</div>
						<div class="chart7-chart">
							<AncChart :option="chart7Option" />
						</div>
					</a-space>
					<a-space :size="16" direction="vertical" class="chart7 anc-card">
						<div class="anc-card-title">热门搜索</div>
						<div class="chart7-chart">
							<AncChart ref="ancChart7" :option="chart8Option" />
						</div>
					</a-space>
				</a-space>
			</a-col>
		</a-row>
	</div>
</template>

<script setup lang="ts" name="Dashboard">
import { formatMoney } from '@/utils/common';
import { getDateRange } from '@/utils/anchor';
import { EChartsOption } from 'echarts/types/dist/shared';

enum statisticType {
	money = 'money',
	count = 'count',
	percentage = 'percentage',
}

/* chart1 */
const chart1 = ref([
	{
		title: '总销售额',
		icon: 'dash-pay',
		type: statisticType.money,
		value: 126560,
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
		type: statisticType.count,
		value: 8463,
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
		type: statisticType.count,
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
		type: statisticType.percentage,
		value: 78,
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

/* chart2和chart3 */
const chart2Key = ref<string>('1');
const dateSegmented = ref({
	value: '',
	options: [
		{
			label: '今日',
			value: 'today',
		},
		{
			label: '本周',
			value: 'week',
		},
		{
			label: '本月',
			value: 'month',
		},
		{
			label: '全年',
			value: 'year',
		},
	],
});
const dateRange = ref<string[] | unknown>([]);
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
const chart2Option = ref<EChartsOption>({
	title: {
		text: '销售额趋势',
		textStyle: {
			fontWeight: 'normal',
			fontSize: '16px',
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
		data: [],
		axisTick: {
			show: false,
		},
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [],
			type: 'bar',
			barMaxWidth: 40,
			itemStyle: {
				color: 'rgb(22, 93, 255)',
			},
		},
	],
	dataZoom: [
		{
			type: 'slider', //slider表示有滑动块的，
			show: true,
			xAxisIndex: [0], //表示x轴折叠
			start: 1, //数据窗口范围的起始百分比,表示1%
			end: 100, //数据窗口范围的结束百分比,表示35%坐标
			bottom: '20',
		},
		{
			type: 'inside',
			xAxisIndex: [0],
			zoomOnMouseWheel: true, //滚轮触发缩放
			moveOnMouseMove: false, //鼠标移动触发平移
			moveOnMouseWheel: false, //鼠标滚轮触发平移
		},
	],
});
const ancChart2 = ref<any>(null);
const chart3Option = ref<EChartsOption>({
	title: {
		text: '访问量趋势',
		textStyle: {
			fontWeight: 'normal',
			fontSize: '16px',
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
		data: [],
		boundaryGap: false,
		axisTick: {
			show: false,
		},
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [],
			type: 'line',
			lineStyle: {
				width: 1.5, //外边线宽度
				color: '#1FCABC', //外边线颜色
			},
			itemStyle: {
				color: '#1FCABC',
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
							color: '#5dc9c1', // 0% 处的颜色
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
	dataZoom: [
		{
			type: 'slider', //slider表示有滑动块的，
			show: true,
			xAxisIndex: [0], //表示x轴折叠
			start: 1, //数据窗口范围的起始百分比,表示1%
			end: 100, //数据窗口范围的结束百分比,表示35%坐标
			bottom: '20',
			selectedDataBackground: {
				lineStyle: {
					color: '#c9edeb',
				},
				areaStyle: {
					color: '#c9edeb',
				},
			},
			fillerColor: '#59c4bc10',
			moveHandleStyle: {
				color: '#c2d5d370',
			},
			emphasis: {
				moveHandleStyle: {
					color: '#5dc9c160',
				},
			},
		},
		{
			type: 'inside',
			xAxisIndex: [0],
			zoomOnMouseWheel: true, //滚轮触发缩放
			moveOnMouseMove: false, //鼠标移动触发平移
			moveOnMouseWheel: false, //鼠标滚轮触发平移
		},
	],
});
const ancChart3 = ref<any>(null);

const handleSegChange = (value: string) => {
	dateRange.value = getDateRange(value)?.range;
	const xAxis = getDateRange(value)?.chartArray;
	const yData = new Array(xAxis.length).fill(0).map(() => {
		return Math.floor(Math.random() * 100);
	});
	(chart2Option.value.xAxis as any).data = xAxis;
	(chart2Option.value.series as any)[0].data = yData;
	ancChart2.value.refresh();
	(chart3Option.value.xAxis as any).data = xAxis;
	(chart3Option.value.series as any)[0].data = yData;
	ancChart3.value.refresh();
	// console.log(chart2Option.value);
};
const handleDateChange = (dates: any, dateStrings: [string, string]) => {
	console.log(dates, dateStrings);
	console.log(dateRange.value);
};

/* chart4 */
const chart4Option = ref<EChartsOption>({
	tooltip: {
		axisPointer: {
			type: 'shadow',
		},
	},
	grid: {
		top: '3%',
		bottom: '0',
		left: '3%',
	},
	xAxis: {
		type: 'value',
		splitLine: {
			show: false, //去掉辅助线
		},
		axisLine: {
			show: false,
		},
		axisLabel: {
			show: false,
		},
	},
	yAxis: {
		type: 'category',
		data: ['新款连衣裙', '四件套', '男士手包', '耳机'],
		splitLine: {
			show: false, //去掉辅助线
		},
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			inside: false,
			show: true,
			margin: 0,
			verticalAlign: 'bottom',
			color: '#5c5c5c', //值的颜色
			fontSize: 14,
			align: 'left',
			padding: [0, 0, 10, 0],
		},
	},
	series: [
		{
			data: ['2356', '8734', '7525', '1674'],
			type: 'bar',
			showBackground: true,
			backgroundStyle: {
				color: '#F6F6F8',
				borderRadius: 5,
			},
			barWidth: 10,
			itemStyle: {
				color: '#B620E0',
				borderRadius: [5, 5, 5, 5],
			},
			label: {
				show: true,
				position: ['100%', -20], //value的位置
				color: '#5c5c5c', //值的颜色
				fontSize: 16,
			},
		},
	],
});

/* chart5 */
const chart5Segmented = ref({
	value: '',
	options: [
		{
			label: '全部渠道',
			value: '0',
		},
		{
			label: '线上',
			value: '1',
		},
		{
			label: '门店',
			value: '2',
		},
	],
});
const chart5Data = [
	{ value: 40, name: '母婴产品' },
	{ value: 33, name: '家用电器' },
	{ value: 28, name: '食用酒水' },
	{ value: 22, name: '洗护健康' },
	{ value: 20, name: '服饰箱包' },
	{ value: 15, name: '其他' },
];
const chart5Option = ref<EChartsOption>({
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)',
	},
	grid: {
		top: '20%',
		bottom: '0',
		left: '10%',
	},
	legend: {
		type: 'scroll',
		orient: 'vertical',
		right: '5%',
		top: '10%',
		// bottom: 20,
		data: chart5Data.map((item) => item.name),
		icon: 'circle',
		padding: [20, 10],
		itemHeight: 8,
		// backgroundColor: '#f5f7fd',
		// itemWidth: 130,
		itemGap: 40,
		// align: 'right',
		// y: 'center',
		itemStyle: {
			borderWidth: 20,
		},
		formatter: function (name: string) {
			// 添加
			let total: number = 0;
			let target: number = 0;
			for (let i = 0; i < chart5Data.length; i++) {
				total += chart5Data[i].value;
				if (chart5Data[i].name === name) {
					target = chart5Data[i].value;
				}
			}
			var arr = ['{a|' + name + '}', '{b|' + ((target / total) * 100).toFixed(2) + '%}', '{c|' + target + '}'];
			return arr.join('');
		},
		textStyle: {
			// 添加
			padding: [3, 0, 0, 0],
			rich: {
				a: {
					fontSize: 15,
					width: 80,
				},
				b: {
					fontSize: 15,
					width: 70,
					color: '#c1c1c1',
				},
				c: {
					fontSize: 15,
				},
			},
		},
	},
	series: [
		{
			name: '销售额类别占比',
			type: 'pie',
			radius: [40, 180],
			center: ['25%', '50%'],
			roseType: 'radius',
			itemStyle: {
				borderRadius: 3,
			},
			label: {
				show: false,
			},
			emphasis: {
				label: {
					show: false,
				},
			},
			data: chart5Data,
		},
	],
});

/* chart6 */
const chart6Deadline = ref(Date.now() + 100 * 60 * 60 * 24 + 1000 * 30);
const chart6Data = ref([
	{
		name: '上海',
		location: [121.48, 31.22],
		value: 2950,
	},
	{
		name: '合肥',
		location: [117.27, 31.86],
		value: 1782,
	},
	{
		name: '北京',
		location: [116.46, 39.92],
		value: 865,
	},
	{
		name: '乌鲁木齐',
		location: [87.68, 43.77],
		value: 1169,
	},
]);
const getChart6DataItem = (name: string) => {
	const data = chart6Data.value.filter((item) => item.name === name);
	if (data.length) {
		return [...data[0].location, data[0].value];
	}
	return [];
};
const chart6Option = ref<EChartsOption>({
	tooltip: {
		trigger: 'item',
		formatter: function (params: any) {
			console.log(params);
			return `<div style="display: flex;align-items: center">
				${params.marker}<div style="margin-left:10px">活动交易情况<br />${params.seriesName}&nbsp&nbsp&nbsp&nbsp${params.value[2]}元</div>
				</div>`;
		},
	},
	bmap: {
		center: [104, 30],
		zoom: 5,
		roam: true,
		mapStyle: {
			styleJson: [
				{
					featureType: 'water',
					elementType: 'all',
					stylers: {
						color: '#d1d1d1',
					},
				},
				{
					featureType: 'land',
					elementType: 'all',
					stylers: {
						color: '#f3f3f3',
					},
				},
				{
					featureType: 'railway',
					elementType: 'all',
					stylers: {
						visibility: 'off',
					},
				},
				{
					featureType: 'highway',
					elementType: 'all',
					stylers: {
						color: '#fdfdfd',
					},
				},
				{
					featureType: 'highway',
					elementType: 'labels',
					stylers: {
						visibility: 'off',
					},
				},
				{
					featureType: 'arterial',
					elementType: 'geometry',
					stylers: {
						color: '#fefefe',
					},
				},
				{
					featureType: 'arterial',
					elementType: 'geometry.fill',
					stylers: {
						color: '#fefefe',
					},
				},
				{
					featureType: 'poi',
					elementType: 'all',
					stylers: {
						visibility: 'off',
					},
				},
				{
					featureType: 'green',
					elementType: 'all',
					stylers: {
						visibility: 'off',
					},
				},
				{
					featureType: 'subway',
					elementType: 'all',
					stylers: {
						visibility: 'off',
					},
				},
				{
					featureType: 'manmade',
					elementType: 'all',
					stylers: {
						color: '#d1d1d1',
					},
				},
				{
					featureType: 'local',
					elementType: 'all',
					stylers: {
						color: '#d1d1d1',
					},
				},
				{
					featureType: 'arterial',
					elementType: 'labels',
					stylers: {
						visibility: 'off',
					},
				},
				{
					featureType: 'boundary',
					elementType: 'all',
					stylers: {
						color: '#fefefe',
					},
				},
				{
					featureType: 'building',
					elementType: 'all',
					stylers: {
						color: '#d1d1d1',
					},
				},
				{
					featureType: 'label',
					elementType: 'labels.text.fill',
					stylers: {
						color: '#999999',
					},
				},
			],
		},
	},
	legend: {
		data: ['上海', '合肥', '北京', '乌鲁木齐'],
		align: 'left', // 设置图例的水平对齐方式
		bottom: 20, // 设置图例距离容器底部的距离
		right: '2%',
		selectedMode: false,
		formatter: (name: any) => {
			const value = getChart6DataItem(name);
			return `${name}   ${value[2]}元   `;
		},
		backgroundColor: '#f5f7fd',
		padding: [10, 20],
		borderRadius: 5,
		itemWidth: 16,
		itemHeight: 8,
		// textStyle: {
		// 	height: 12,
		// 	width: 50,
		// },
	},
	series: [
		{
			name: '上海',
			type: 'effectScatter',
			coordinateSystem: 'bmap',
			data: [
				{
					name: '上海',
					value: getChart6DataItem('上海'),
				},
			],
			symbolSize: function (val: number[]) {
				return val[2] / 100;
			},
			encode: {
				value: 2,
			},
			label: {
				// formatter: '{b}',
				position: 'right',
				show: false,
			},
			emphasis: {
				label: {
					show: true,
				},
			},
		},
		{
			name: '合肥',
			type: 'effectScatter',
			coordinateSystem: 'bmap',
			data: [
				{
					name: '合肥',
					value: getChart6DataItem('合肥'),
				},
			],
			symbolSize: function (val: number[]) {
				return val[2] / 100;
			},
			encode: {
				value: 2,
			},
			label: {
				// formatter: '{b}',
				position: 'right',
				show: false,
			},
			emphasis: {
				label: {
					show: true,
				},
			},
		},
		{
			name: '北京',
			type: 'effectScatter',
			coordinateSystem: 'bmap',
			data: [
				{
					name: '北京',
					value: getChart6DataItem('北京'),
				},
			],
			symbolSize: function (val: number[]) {
				return val[2] / 100;
			},
			encode: {
				value: 2,
			},
			label: {
				// formatter: '{b}',
				position: 'right',
				show: false,
			},
			emphasis: {
				label: {
					show: true,
				},
			},
		},
		{
			name: '乌鲁木齐',
			type: 'effectScatter',
			coordinateSystem: 'bmap',
			data: [
				{
					name: '乌鲁木齐',
					value: getChart6DataItem('乌鲁木齐'),
				},
			],
			symbolSize: function (val: number[]) {
				return val[2] / 100;
			},
			encode: {
				value: 2,
			},
			label: {
				// formatter: '{b}',
				position: 'right',
				show: false,
			},
			emphasis: {
				label: {
					show: true,
				},
			},
		},
	],
});

/* chart7 */
const gaugeData = [
	{
		value: 20,
		name: '购物返利',
		title: {
			offsetCenter: ['0%', '-46%'],
		},
		detail: {
			valueAnimation: true,
			offsetCenter: ['0%', '-30%'],
		},
	},
	{
		value: 40,
		name: '抽奖',
		title: {
			offsetCenter: ['0%', '-8%'],
		},
		detail: {
			valueAnimation: true,
			offsetCenter: ['0%', '8%'],
		},
	},
	{
		value: 60,
		name: '抵用卷',
		title: {
			offsetCenter: ['0%', '30%'],
		},
		detail: {
			valueAnimation: true,
			offsetCenter: ['0%', '46%'],
		},
	},
];
const ancChart7 = ref<any>(null);
const chart7Option = ref<EChartsOption>({
	series: [
		{
			type: 'gauge',
			startAngle: 90,
			endAngle: -270,
			radius: '100%',
			pointer: {
				show: false,
			},
			progress: {
				show: true,
				overlap: false,
				roundCap: true,
				clip: false,
				itemStyle: {
					borderWidth: 1,
					borderColor: '#464646',
				},
			},
			axisLine: {
				lineStyle: {
					width: 40,
				},
			},
			splitLine: {
				show: false,
				distance: 0,
				length: 10,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: false,
				distance: 50,
			},
			data: gaugeData,
			title: {
				fontSize: 14,
			},
			detail: {
				width: 50,
				height: 10,
				fontSize: 14,
				color: 'inherit',
				// distance: 20,
				borderColor: 'inherit',
				borderRadius: 20,
				borderWidth: 1,
				formatter: '{value}%',
			},
		},
	],
});

/* chart8 */
const chart8Option = ref<any>({
	series: [
		{
			type: 'wordCloud',
			shape: 'circle',
			keepAspect: true,
			// maskImage: maskImage,
			left: 'center',
			top: 'center',
			width: '100%',
			height: '90%',
			right: null,
			bottom: null,
			sizeRange: [10, 50], //大小范围
			rotationRange: [0, 0], //旋转角度范围
			rotationStep: 0,
			gridSize: 8, //间距
			drawOutOfBound: false, //溢出显示
			layoutAnimation: true,
			textStyle: {
				fontFamily: 'sans-serif',
				fontWeight: '600',
				color: function () {
					return 'rgb(' + [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)].join(',') + ')';
				},
			},
			emphasis: {
				// focus: 'self',
				textStyle: {
					textShadowBlur: 3,
					textShadowColor: '#ccc',
				},
			},
			//data属性中的value值却大，权重就却大，展示字体就却大
			data: [
				{ name: '桂语山房', value: 366 },
				{ name: '绿茶', value: 90 },
				{ name: '西式龙虾', value: 23 },
				{ name: 'Half', value: 455 },
				{ name: '西餐厅', value: 124 },
				{ name: 'malamala', value: 854 },
				{ name: '黑桃餐厅', value: 323 },
				{ name: '博悦西餐厅', value: 467 },
				{ name: '舍逸艺术餐厅', value: 745 },
				{ name: '外婆家', value: 345 },
				{ name: '艺赤罗', value: 220 },
				{ name: '桂语山房', value: 343 },
				{ name: '西贝莜面村', value: 112 },
				{ name: 'McCafe', value: 20 },
				{ name: 'Burger King', value: 789 },
				{ name: 'KFC', value: 1203 },
				{ name: '全家 Familly', value: 640 },
				{ name: 'Hard Rock Cafe', value: 893 },
				{ name: '小杨生煎', value: 1823 },
				{ name: '喜事龙虾', value: 132 },
				{ name: '王品牛排', value: 303 },
				{ name: '1921 湖景餐厅', value: 959 },
			],
		},
	],
});

// setInterval(function () {
// 	gaugeData[0].value = +(Math.random() * 100).toFixed(2);
// 	gaugeData[1].value = +(Math.random() * 100).toFixed(2);
// 	gaugeData[2].value = +(Math.random() * 100).toFixed(2);
// 	ancChart7.value.refresh();
// }, 2000);

onMounted(() => {
	nextTick(() => {
		/* 设置chart2 */
		dateSegmented.value.value = 'today';
		handleSegChange('today');
	});
});
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
	.chart4 {
		&-title {
			font-size: 16px;
			line-height: 40px;
		}
		&-statistic {
			background-color: $color-bg;
			padding: $padding;
			border-radius: $radius-box;
			&:deep(.ant-statistic-content) {
				overflow: hidden;
				display: flex;
				align-items: center;
				.ant-statistic-content-suffix {
					font-size: 14px;
					flex: 1;
					text-align: right;
					// display: inline-block;
				}
			}

			.suffix-count-up {
				color: $color-success;
			}
			.suffix-count-down {
				color: $color-danger;
			}
			// &:deep(.ant-statistic-title) {
			// 	font-size: 16px;
			// }
		}
		&-chart {
			height: 300px;
		}
	}
	.chart5 {
		&-title {
			font-size: 16px;
			line-height: 40px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&-chart {
			height: 411px;
		}
	}
	.chart6 {
		&-title {
			font-size: 16px;
			line-height: 40px;
		}
		&-statistic {
			background-color: $color-bg;
			padding: $padding;
			border-radius: $radius-box;
			&:deep(.ant-statistic-content) {
				overflow: hidden;
				display: flex;
				align-items: center;
				.ant-statistic-content-suffix {
					font-size: 14px;
					flex: 1;
					text-align: right;
					// display: inline-block;
				}
			}

			.suffix-count-up {
				color: $color-success;
			}
			.suffix-count-down {
				color: $color-danger;
			}
			// &:deep(.ant-statistic-title) {
			// 	font-size: 16px;
			// }
		}
		&-chart {
			height: 600px;
		}
	}
	.chart7 {
		&-title {
			font-size: 16px;
			line-height: 40px;
		}
		&-chart {
			height: 296px;
		}
	}
}
</style>
