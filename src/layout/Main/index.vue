<template>
	<a-layout-content class="main">
		<router-view v-slot="{ Component, route }">
			<!-- <transition :name="transitionName(route)" mode="out-in" appear>
				
			</transition> -->
			<keep-alive>
				<component :is="Component" :key="route.matched?.[1]?.path" />
			</keep-alive>
		</router-view>
	</a-layout-content>
</template>

<script lang="ts" setup name="Main">
// import type { RouteLocationNormalizedLoaded } from 'vue-router';
// import { useAppStore } from '@/stores';
// const appStore = useAppStore();

/** 过度动画 */
// const transitionName = computed(() => {
// 	return function (route: RouteLocationNormalizedLoaded) {
// 		if (route?.matched?.[1]?.meta?.animation === false) {
// 			return '';
// 		}
// 		return 'zoom-fade';
// 	};
// });
</script>

<style lang="scss" scoped>
.main {
	// width: 100%;
	height: 100%;
	padding: $margin;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: auto;
	position: relative;
}
</style>
