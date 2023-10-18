/** 接口返回数据格式 */
interface ApiRes<T> {
	code: number;
	message: string;
	data: T;
	success: boolean;
}
