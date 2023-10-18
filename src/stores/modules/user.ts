import { getToken, setToken } from '@/utils/auth';
import { defineStore } from 'pinia';
import { login as loginApi } from '@/api';
import { ref, computed, reactive } from 'vue';

export const useUserStore = defineStore('user', () => {
	const userInfo = reactive({
		nickname: 'admin',
		avatar: '',
	});
	const name = computed(() => userInfo.nickname);
	const avatar = computed(() => userInfo.avatar);

	const token = ref<string>(getToken() || '');
	// const roles = ref<string[]>([]); //当前用户的角色

	//登录
	const login = async (params: any) => {
		const res = await loginApi({
			username: params?.username || '',
			password: params?.password || '',
		});

		setToken(res.data.token);
		token.value = res.data.token;
	};

	return { name, avatar, token, login };
});
