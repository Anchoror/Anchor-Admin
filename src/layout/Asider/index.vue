<template>
	<div class="asider">
		<Logo :collapsed="appStore.menuCollapse" />
		<a-layout-sider class="menu" collapsible :width="216" :trigger="null" :collapsed="appStore.menuCollapse">
			<a-menu v-model:selectedKeys="activeMenu" mode="inline" :inline-collapsed="appStore.menuCollapse">
				<SidebarItem v-for="(route, index) in sidebarRoutes" :key="route.path + index" :item="route" />
			</a-menu>
		</a-layout-sider>
	</div>
</template>

<script lang="ts" setup name="Asider">
import { useAppStore, useRouteStore } from '@/stores';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';

const route = useRoute();
const appStore = useAppStore();
const routeStore = useRouteStore();

const sidebarRoutes = computed(() => routeStore.routes);
// 当前页面激活菜单路径，先从路由里面找
const activeMenu = computed(() => {
	const { meta, path } = route;
	if (meta?.activeMenu) {
		return [meta.activeMenu];
	}
	return [path];
});
</script>

<style lang="scss" scoped>
.asider {
	z-index: 1000;
	display: flex;
	flex-direction: column;
	border-right: 1px solid $color-border;
	flex-shrink: 0;
	height: 100%;

	.menu {
		flex: 1 !important;
		background-color: $color-bg-box;
		overflow: hidden;
		color: $color-text-2;
		&:deep(.ant-menu-item) {
			color: $color-text-2;
		}

		&:deep(.ant-menu-submenu-selected) {
			color: $color-theme;
		}
		&:deep(.ant-menu-item-selected) {
			color: $color-theme;
			background-color: $color-theme-sub2;
		}
		&:deep(.ant-layout-sider-children) {
			overflow: auto;
			scrollbar-width: none; /* Firefox */
			-ms-overflow-style: none; /* IE 10+ */
			&::-webkit-scrollbar {
				display: none; /* Chrome Safari */
			}
		}
	}
}
</style>
