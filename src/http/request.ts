import axios, { Axios, AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";
import { getMessageInfo } from "./status";
// import { ElMessage } from "element-plus";

interface BaseResponse<T = any> {
	code: number | string;
	message: string;
	data?: T;
}

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 5000,
});

service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => {
		console.log("request error", error);
		Promise.reject(error);
	},
);
service.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			return response.data;
		}
		// ElMessage({
		// 	message: getMessageInfo(response.status),
		// 	type: "error",
		// });
	},
	(error: any) => {
		const { response } = error;
		if (response) {
			// ElMessage({
			// 	message: getMessageInfo(response.status),
			// 	type: "error",
			// });
			return Promise.reject(response);
		} else {
			// ElMessage({
			// 	message: "服务器连接失败",
			// 	type: "error",
			// });
			return Promise.reject(error);
		}
	},
);

/**
 * 创建一个通用的请求实例
 *
 * @template T 泛型类型，默认为 any
 * @param config 请求配置对象
 * @returns 返回一个 Promise，解析为 T 类型的响应数据
 */
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
	const conf = config;
	return new Promise((resolve, reject) => {
		service.request<any, AxiosResponse<BaseResponse>>(conf).then((res: AxiosResponse<BaseResponse>) => {
			const data = res.data;
			// 如果data.code为错误代码返回message信息
			if (data.code != 1) {
				ElMessage({
					message: data.message,
					type: "error",
				});
				reject(data.message);
			} else {
				ElMessage({
					message: data.message,
					type: "success",
				});
				// 此处返回data信息 也就是 api 中配置好的 Response类型
				resolve(data.data as T);
			}
		});
	});
};

// 在最后使用封装过的axios导出不同的请求方式
export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
	return requestInstance({ ...config, url, method: "GET", params: parms });
}

export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
	return requestInstance({ ...config, url, method: "POST", data: data });
}
export default service;
