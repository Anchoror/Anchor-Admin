import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { message as antMessage } from 'ant-design-vue';
import { getToken } from './auth';

// 请求返回code枚举
interface ICodeMessage {
	[propName: number]: string;
}

const StatusCodeMessage: ICodeMessage = {
	200: '服务器成功返回请求的数据',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）',
	204: '删除数据成功',
	400: '请求错误(400)',
	401: '未授权，请重新登录(401)',
	403: '拒绝访问(403)',
	404: '请求出错(404)',
	408: '请求超时(408)',
	500: '服务器错误(500)',
	501: '服务未实现(501)',
	502: '网络错误(502)',
	503: '服务不可用(503)',
	504: '网络超时(504)',
};

// 创建axios
const http: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 12000,
});

// 请求拦截器
http.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 处理进度条
		// NProgress.start();

		config.headers['Content-Type'] = 'application/json;charset=utf-8';
		const token = getToken();
		if (token) {
			config.headers['token'] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
http.interceptors.response.use(
	(response: AxiosResponse) => {
		const { data } = response;
		const { message, success, code } = data;

		// token失效
		if (code === 401) {
			// NProgress.done();
			// Message.error('token失效')
			// router.replace('/login');
			return Promise.reject(new Error('token失效'));
		}

		if (!success) {
			// NProgress.done();
			// 如果错误信息长度过长，使用 Notification 进行提示
			antMessage.error(message || '服务器端错误');

			return Promise.reject(new Error('Error'));
		}

		// NProgress.done();
		return response;
	},
	(error) => {
		// NProgress.done();
		const response = Object.assign({}, error.response);
		response && antMessage.error(StatusCodeMessage[response.status] || '系统异常, 请检查网络或联系管理员！');
		return Promise.reject(error);
	}
);

const request = <T = unknown>(config: AxiosRequestConfig): Promise<ApiRes<T>> => {
	return new Promise((resolve, reject) => {
		http
			.request<T>(config)
			.then((res: AxiosResponse) => resolve(res.data))
			.catch((err: { message: string }) => reject(err));
	});
};

request.get = <T = any>(url: string, params?: object, headers?: AxiosRequestHeaders): Promise<ApiRes<T>> => {
	return request({
		method: 'get',
		url,
		params,
		headers,
	});
};

request.post = <T = any>(url: string, params?: object, headers?: AxiosRequestHeaders): Promise<ApiRes<T>> => {
	return request({
		method: 'post',
		url,
		data: params,
		headers,
	});
};

export default request;
