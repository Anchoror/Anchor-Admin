<template>
	<div class="tabs">
		<a-tabs
			v-model:activeKey="route.path"
			type="editable-card"
			hide-add
			:tab-bar-gutter="0"
			@tab-click="(key: any) => handleTabClick(key.toString())"
			@edit="tabsStore.closeCurrent"
		>
			<a-tab-pane v-for="pane in tabsStore.tagList" :key="pane.path" :tab="pane.meta?.title" :closable="Boolean(!pane.meta?.affix)"> </a-tab-pane>

			<template #rightExtra>
				<!-- 右侧按钮 -->
				<!-- <a-dropdown trigger="hover">
					<MagicIcon class="gi_mr"></MagicIcon>
					<template #content>
						<a-doption @click="tabsStore.closeCurrent(route.path)">
							<template #icon><icon-close /></template>
							<template #default>关闭当前</template>
						</a-doption>
						<a-doption @click="tabsStore.closeOther(route.path)">
							<template #icon><icon-eraser /></template>
							<template #default>关闭其他</template>
						</a-doption>
						<a-doption @click="tabsStore.closeAll">
							<template #icon><icon-minus /></template>
							<template #default>关闭全部</template>
						</a-doption>
					</template>
				</a-dropdown> -->
			</template>
		</a-tabs>
	</div>
</template>

<script setup lang="ts" name="Tabs">
import type { RouteRecordRaw } from 'vue-router';
import { useTabsStore, useAppStore } from '@/stores';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const tabsStore = useTabsStore();

// 重置, 同时把 affix: true 的路由筛选出来
tabsStore.reset();

// 监听路由变化
watch(
	() => route.path,
	() => {
		nextTick(() => {
			handleRouteChange();
		});
	},
	{ immediate: true }
);

// 路由发生改变触发
const handleRouteChange = () => {
	const item = { ...route } as unknown as RouteRecordRaw;
	tabsStore.addTagItem(item);
	tabsStore.addCacheItem(item);
	console.log('路由对象', toRaw(item));
	console.log('tagList', toRaw(tabsStore.tagList));
	console.log('cacheList', toRaw(tabsStore.cacheList));
};

// 点击页签
const handleTabClick = (key: string) => {
	router.push({ path: key });
};
</script>

<style lang="scss" scoped>
.tabs {
	padding-top: 5px;
	background: $color-bg-box;
}
.ant-tabs {
	:deep(.ant-tabs-nav) {
		margin: 0;
		.ant-tabs-tab {
			padding: 4px 16px;
			margin-left: 0;
			border-radius: $radius-box-mini;
			border-left: 0px solid #fff;
			// border-bottom-color: transparent !important;
			background-color: $color-bg-box;
			transition: all 0.2s cubic-bezier(0, 0, 1, 1);
			&:first-child {
				border-left: 0px solid $color-border;
			}
			.ant-tabs-tab-remove {
				width: 0;
				overflow: hidden;
			}
			&:hover {
				color: $color-text-2;
				.ant-tabs-tab-remove {
					width: 1em;
				}
			}
			&.ant-tabs-tab-active {
				// border-bottom-color: $color-border;
				background-color: $color-bg;
				border-bottom-color: $color-bg;
				.ant-tabs-tab-btn {
					color: $color-theme !important;
				}
				svg {
					color: $color-theme !important;
				}
			}
		}
	}
}
</style>
