import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import { constantRoutes } from '@/router';
import Layout from '@/layout/index.vue';
import ParentView from '@/components/ParentView/index.vue';
import { getUserAsyncRoutes } from '@/api';
import { mapTree } from 'xe-utils';

// 匹配 views 里面所有的 .vue 文件
const modules = import.meta.glob('@/views/**/*.vue');

/** 加载模块 */
export const loadView = (view: string) => {
	let res;
	for (const path in modules) {
		const dir = path.split('views/')[1].split('.vue')[0];
		if (dir === view) {
			res = () => modules[path]();
		}
	}
	return res;
};

/** 遍历后台返回的路由，将 component 转成真正的模块 */
const filterAsyncRouter = (routes: RouteRecordRaw[]) => {
	return mapTree(routes, (item) => {
		let componentView;
		const component = item['component'] as unknown as string;
		if (component === 'Layout') {
			componentView = Layout as never;
		} else if (component === 'ParentView') {
			componentView = ParentView as never;
		} else {
			componentView = loadView(component) as never;
		}
		return {
			...item,
			component: componentView,
		};
	});
};

export const useRouteStore = defineStore('route', () => {
	/** 所有路由（常驻路由  +  动态路由） */
	const routes = ref<RouteRecordRaw[]>([]);

	const setRoutes = (value: RouteRecordRaw[]) => {
		routes.value = constantRoutes.concat(value);
	};

	const generateRoutes = () => {
		return new Promise((resolve, reject) => {
			getUserAsyncRoutes()
				.then((res) => {
					const data = JSON.parse(JSON.stringify(res.data));
					const asyncRoutes = filterAsyncRouter(data);
					setRoutes(asyncRoutes);
					resolve(asyncRoutes);
				})
				.catch((error) => reject(error));
		});
	};

	return { routes, generateRoutes };
});
