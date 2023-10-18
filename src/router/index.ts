import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';

/** 静态路由 */
export const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '',
		component: () => import('@/views/home/index.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: constantRoutes,
	scrollBehavior: () => ({ top: 0, left: 0 }),
});

export default router;
