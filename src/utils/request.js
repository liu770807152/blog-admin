import axios from 'axios';
import { createBrowserHistory } from 'history';
import { notification } from 'antd';

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};
export const baseURL =
	// process.env.UMI_ENV === 'uat'
	// 	? 'https://uat.xxx.com.au/'
	// 	: process.env.NODE_ENV === 'production'
	// 		? 'https://xxx.com.au/'
	// 		: 'http://localhost:7001/';
	'http://localhost:7001/';
const withCredentials = false;
const timeout = 30000;

const axiosInstance = axios.create({
	baseURL,
	withCredentials,
	timeout,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token') || '';
//   /* eslint-disable no-param-reassign */
//   config.headers.Authorization = token;
//   return config;
// });

axiosInstance.interceptors.response.use(
	(response) => {
		const contentType = response.headers['content-type'];
		if (
			contentType &&
			contentType.match(/application\/json/i) &&
			response.data.token
		) {
			localStorage.setItem('token', response.data.token);
		}
		return Promise.resolve(response);
	},
	(error) => {
		const { response } = error;
		const { status } = response;
		const history = createBrowserHistory();
		if (status !== 401) {
			notification.error({
				message: response.data.message || codeMessage[status],
				duration: 10,
			});
		}
		if (status === 401) {
			// @HACK
			/* eslint-disable no-underscore-dangle */
			// getDvaApp()._store.dispatch({
			//   type: 'login/logout',
			//   payload: {
			//     error: response?.data?.error
			//   }
			// });
		} else if (status === 403) {
			history.push({ pathname: '/exception/403' });
			history.go();
		} else if (status >= 500 && status <= 504) {
			history.push({ pathname: '/exception/500' });
			history.go();
		} else if (status >= 404 && status < 422) {
			history.push({ pathname: '/exception/404' });
			// history.go();
		}
		return Promise.reject(response);
	}
);

/**
 * Requests a path, returning a promise.
 * @param  {string} path       The path we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
	return axiosInstance(options)
		.then((response) => response.data)
		.catch((error) => error);
}
