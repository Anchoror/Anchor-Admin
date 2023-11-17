import { defineStore } from 'pinia';
import defaultSettings from '@/config/setting.json';

export const useAppStore = defineStore('app', () => {
	// App配置
	const settingConfig = reactive({ ...defaultSettings }) as App.SettingConfig;

	// 设置左侧菜单折叠状态
	const setMenuCollapse = (collapsed: boolean) => {
		settingConfig.menuCollapse = collapsed;
	};

	return {
		...toRefs(settingConfig),
		setMenuCollapse,
	};
});
