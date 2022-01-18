import request from '../utils/request';
import path from '../config/apiUrl';

export function addArticle(payload) {
	return request({
		url: path.addArticle,
		method: 'post',
		data: payload,
		withCredentials: true, // share session between front-end & back-end
	});
}

export function updateArticle(payload) {
	return request({
		url: path.updateArticle,
		method: 'post',
		data: payload,
		withCredentials: true, // share session between front-end & back-end
		header: { 'Access-Control-Allow-Origin': '*' },
	});
}
