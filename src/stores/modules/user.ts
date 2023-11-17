import { getToken, setToken, clearToken } from '@/utils/auth';
import { defineStore } from 'pinia';
import { login as loginApi, logout as logoutApi, getUserInfo as getUserInfoApi } from '@/api';
import { resetRouter } from '@/router';
import { ref } from 'vue';
import type * as User from '@/api/user/type';
import { resetHasRouteFlag } from '@/router/permission';

export const useUserStore = defineStore('user', () => {
	const nickname = ref('Admin');
	const avatar = ref('');

	const token = ref<string>(getToken() || '');
	const roles = ref<string[]>([]); // 当前用户角色
	const permissions = ref<string[]>([]); // 当前角色权限标识集合

	// 重置token
	const resetToken = () => {
		token.value = '';
		clearToken();
		resetHasRouteFlag();
	};

	//登录
	const login = (params: any): Promise<User.LoginRes> => {
		return new Promise((resolve, reject) => {
			loginApi({
				username: params?.username || '',
				password: params?.password || '',
			})
				.then((res) => {
					setToken(res.data.token);
					token.value = res.data.token;
					resolve(res.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	};

	// 退出登录
	const logout = (): Promise<void> => {
		return new Promise((reslove) => {
			logoutApi().then(() => {
				roles.value = [];
				permissions.value = [];
				resetToken();
				resetRouter();
				reslove();
			});
		});
	};

	// 获取用户信息
	const getInfo = (): Promise<User.UserInfo> => {
		return new Promise((resolve, reject) => {
			getUserInfoApi()
				.then((res) => {
					nickname.value = res.data.nickname;
					avatar.value = res.data.avatar;
					resolve(res.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	};

	return { nickname, avatar, token, login, logout, getInfo, resetToken };
});
