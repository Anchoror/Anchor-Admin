<template>
	<div ref="chartDom" class="chartDom"></div>
</template>

<script setup lang="ts" name="ancChart">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { GeoJSON } from 'echarts/types/src/coord/geo/geoTypes';
import chinaJson from './china.json';
import 'echarts/extension/bmap/bmap';
import 'echarts-wordcloud';

const props = defineProps({
	option: {
		type: Object,
		default: () => ({}),
	},
});

const chartDom = ref(null);
const refresh = () => {
	// console.log('刷新');
	const myChart = echarts.init(chartDom.value);
	myChart.setOption(props.option);
};

onMounted(() => {
	const myChart = echarts.init(chartDom.value);
	echarts.registerMap('china', chinaJson as GeoJSON);
	myChart.setOption(props.option);
	window.addEventListener(
		'resize',
		() => {
			myChart.resize();
		},
		true
	);
});

defineExpose({
	refresh,
});
</script>

<style lang="scss" scoped>
.chartDom {
	// width: 100%;
	height: 100%;
}
</style>
