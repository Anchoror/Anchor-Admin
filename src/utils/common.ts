import { isExternal } from '@/utils/validate';
import { mapTree, values } from 'xe-utils';

/** @desc 千分位格式化 */
export function formatMoney(num: string | number) {
	const money = typeof num === 'string' ? num : num.toString();
	return money.replace(new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',');
}

/**
 * @desc 动态路由 path 转 name
 * @demo /system => System
 * @demo /system/menu => SystemMenu
 */
export const transformPathToName = (path: string) => {
	if (!path) return '';
	if (isExternal(path)) return '';
	let name = '';
	if (path) {
		const arr = path
			.split('/')
			.filter((i) => i)
			.map((i) => i.substring(0, 1).toUpperCase() + i.substring(1));
		arr.forEach((i) => {
			name += i;
		});
	}
	return name;
};

/**
 * @desc 过滤树
 * @param { values } 数组
 */
type FilterTree = <T extends { children?: T[] }>(array: T[], iterate: (item: T, index?: number, items?: T[]) => boolean) => T[];
export const filterTree: FilterTree = (values, fn) => {
	const arr = values.filter(fn);
	const data = mapTree(arr, (item) => {
		if (item.children && item.children.length) {
			item.children = item.children.filter(fn);
		}
		return item;
	});
	return data;
};

type SortTree = <T extends { sort: number; children?: T[] }>(array: T[]) => T[];
/**
 * @desc 排序树
 * @param { values } 数组
 */
export const sortTree: SortTree = (values) => {
	values?.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)); // 排序
	return mapTree(values, (item) => {
		item.children?.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)); // 排序
		return item;
	});
};
