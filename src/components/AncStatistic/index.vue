<template>
	<a-statistic :title="props?.title" class="anc-statistic">
		<template #prefix> <slot name="prefix"></slot> </template>
		<template #formatter>
			<span ref="countupRef"></span>
			<span v-if="props.type === 'percentage'">%</span>
		</template>
	</a-statistic>
</template>

<script setup lang="ts" name="ancStatistic">
import { CountUp } from 'countup.js';
import type { CountUpOptions } from 'countup.js';

interface Props {
	title?: string;
	value: number;
	type: string;
}
const props = withDefaults(defineProps<Props>(), {
	title: '',
	value: 0,
	type: 'money',
});

const countupRef = ref();

const options: CountUpOptions = {
	startVal: 0, // 开始的数字  一般设置0开始
	decimalPlaces: props.type === 'money' ? 2 : 0, // number类型 小数位，整数自动添.00
	duration: 2, // number类型 动画延迟秒数，默认值是2
	useGrouping: props.type !== 'percentage', // boolean类型  是否开启逗号，默认true(1,000)false(1000)
	useEasing: true, // booleanl类型 动画缓动效果(ease),默认true
	smartEasingThreshold: 500, // numberl类型 大于这个数值的值开启平滑缓动
	smartEasingAmount: 300, // numberl类型
	separator: ',', // string 类型 分割用的符号
	decimal: '.', // string 类型  小数分割符合
	prefix: '', // sttring 类型  数字开头添加固定字符
	suffix: '', // sttring类型 数字末尾添加固定字符
	numerals: [], // Array类型 替换从0到9对应的字，也就是自定数字字符了,数组存储
};
onMounted(() => {
	initCount();
});
const initCount = () => {
	let numAnim = new CountUp(countupRef.value, props.value, options);
	numAnim.start();
};
</script>

<style lang="scss" scoped>
.anc-statistic {
	&:deep(.ant-statistic-title) {
		font-size: 16px;
		color: $color-text-2;
		margin-bottom: 10px;
	}
}
</style>
