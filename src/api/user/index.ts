import http from '@/utils/http';
import type * as User from './type';

/** @desc 登录 */
export function login(data: { username: string; password: string }) {
	return http.post<User.LoginRes>(`/user/login`, data);
}
