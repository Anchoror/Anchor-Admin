import dayjs from 'dayjs';

/**
 * @desc 获取当前日期和时间
 * @param { value } 枚举：today(今天)，week(本周), month(本月)， year(本年)
 * @param { format } 日期格式
 * @return {range, chartArray} 日期区间数组和日期区间遍历数组
 */
interface dateRange {
	range: string[];
	chartArray: string[];
}
export function getDateRange(value: string, format: string = 'YYYY-MM-DD'): dateRange {
	let range: string[] = [];
	let chartArray: string[] = [];

	if (value === 'today') {
		range = [dayjs().format(format), dayjs().format(format)];
		chartArray = [];
		for (let i: number = 0; i < 24; i++) {
			chartArray.push(i.toString().padStart(2, '0') + ':00');
		}
	}
	if (value === 'week') {
		range = [dayjs().startOf(value).format(format), dayjs().endOf(value).format(format)];
		chartArray = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
	}
	if (value === 'month') {
		range = [dayjs().startOf(value).format(format), dayjs().endOf(value).format(format)];
		chartArray = [];
		while (chartArray.length == 0 || !dayjs(chartArray[chartArray.length - 1]).isSame(dayjs(range[1]).format('MM-DD'))) {
			if (chartArray.length == 0) {
				chartArray.push(dayjs(range[0]).format('MM-DD'));
			} else {
				chartArray.push(
					dayjs(chartArray[chartArray.length - 1])
						.add(1, 'day')
						.format('MM-DD')
				);
			}
		}
	}
	if (value === 'year') {
		range = [dayjs().startOf(value).format(format), dayjs().endOf(value).format(format)];
		chartArray = [];
		while (chartArray.length == 0 || !dayjs(chartArray[chartArray.length - 1]).isSame(dayjs(range[1]).format('YYYY-MM'))) {
			if (chartArray.length == 0) {
				chartArray.push(dayjs(range[0]).format('YYYY-MM'));
			} else {
				chartArray.push(
					dayjs(chartArray[chartArray.length - 1])
						.add(1, 'month')
						.format('YYYY-MM')
				);
			}
		}
	}
	return {
		range: range,
		chartArray: chartArray,
	};
}
