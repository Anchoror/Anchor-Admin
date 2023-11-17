<template>
	<div ref="chartDom" class="chartDom"></div>
</template>

<script setup lang="ts" name="ancChart">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
	option: {
		type: Object,
		default: () => ({}),
	},
});

const chartDom = ref(null);

onMounted(() => {
	const myChart = echarts.init(chartDom.value);
	myChart.setOption(props.option);
	window.addEventListener(
		'resize',
		() => {
			myChart.resize();
		},
		true
	);
});
</script>

<style lang="scss" scoped>
.chartDom {
	// width: 100%;
	height: 100%;
}
</style>
