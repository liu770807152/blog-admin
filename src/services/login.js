import request from '../utils/request';
import path from '../config/apiUrl';

export default function login(payload) {
	return request({
		url: path.checkLogin,
		method: 'post',
		data: payload,
		withCredentials: true, // share session between front-end & back-end
	});
}
