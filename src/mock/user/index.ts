import type { MockMethod } from 'vite-plugin-mock';
import { successResponseWrap, failResponseWrap } from '../mock';
import { menus } from '../data/menu';
import type { MockMenuItem } from '../data/type';
import { mapTree } from 'xe-utils';
import { transformPathToName, filterTree, sortTree } from '@/utils/common';

const getRoleMenus = (value: typeof menus, roles: string[]) => {
	// 排序过后的数据
	const sortData = sortTree(value);
	// 如果是超级管理员角色
	if (roles.includes('role_admin')) {
		return filterTree<MockMenuItem>(sortData, (i) => [1, 2].includes(i.type));
	}
	// 如果是普通用户角色
	const userRoleMenu = filterTree<MockMenuItem>(
		sortData,
		(i) => i.path !== '/system' && i.roles.some((i) => roles.includes(i)) && [1, 2].includes(i.type)
	);
	return userRoleMenu;
};

export default [
	{
		url: '/user/login',
		method: 'post',
		timeout: 300,
		response: ({ body }) => {
			const { username, password } = body;
			if (!username) {
				return failResponseWrap(null, '用户名不能为空', 50000);
			}
			if (!password) {
				return failResponseWrap(null, '密码不能为空', 50000);
			}
			if (username === 'admin' && password === '123456') {
				return successResponseWrap({
					token: 'TOKEN-admin',
				});
			}
			if (username === 'user' && password === '123456') {
				return successResponseWrap({
					token: 'TOKEN-user',
				});
			}
			return failResponseWrap(null, '账号或者密码错误', 50000);
		},
	},
	{
		url: '/user/logout',
		method: 'post',
		timeout: 300,
		response: () => {
			return successResponseWrap({});
		},
	},
	{
		url: '/user/getUserInfo',
		method: 'get',
		timeout: 300,
		response: ({ body }) => {
			return successResponseWrap({
				id: '1',
				nickname: 'anchor',
				avatar: '',
				roles: ['role_admin'],
				permissions: ['*:*:*'],
			});
		},
	},
	{
		url: '/user/routes',
		method: 'get',
		timeout: 20,
		response: ({ headers }) => {
			const token = headers.token;
			const isAdmin = token === 'TOKEN-admin';
			const roles = isAdmin ? ['role_admin'] : ['role_user'];
			const data = getRoleMenus(JSON.parse(JSON.stringify(menus)), roles);
			const routes = mapTree(data, (item) => {
				const meta: any = {
					hidden: item?.hidden || false,
					keepAlive: item?.keepAlive || false,
					title: item?.title,
					svgIcon: item?.svgIcon,
					showInTabs: item?.showInTabs,
					affix: item?.affix,
					activeMenu: item?.activeMenu,
					breadcrumb: item?.breadcrumb,
					alwaysShow: item?.alwaysShow,
				};

				return {
					path: item.path,
					name: transformPathToName(item.path),
					redirect: item.redirect,
					component: item.component,
					meta: meta,
				};
			});

			if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
				return successResponseWrap(routes);
			} else {
				return failResponseWrap(null, 'token失效', 401);
			}
		},
	},
] as MockMethod[];
