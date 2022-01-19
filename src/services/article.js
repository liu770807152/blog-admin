import request from '../utils/request';
import path from '../config/apiUrl';

export function addArticle(payload) {
	return request({
		url: path.article,
		method: 'post',
		data: payload,
		withCredentials: true, // share session between front-end & back-end
		header: { 'Access-Control-Allow-Origin': '*' },
	});
}

export function getArticleById(payload) {
	if (payload.id)
		return request({
			url: `${path.article}/${payload.id}`,
			method: 'get',
			withCredentials: true, // share session between front-end & back-end
			header: { 'Access-Control-Allow-Origin': '*' },
		});
	else return Promise.reject('ID lacked!');
}

export function updateArticle(payload) {
	if (payload.id)
		return request({
			url: `${path.article}/${payload.id}`,
			method: 'post',
			data: payload,
			withCredentials: true, // share session between front-end & back-end
			header: { 'Access-Control-Allow-Origin': '*' },
		});
	else return Promise.reject('ID lacked!');
}

export function deleteArticle(payload) {
	if (payload.id)
		return request({
			url: `${path.article}/${payload.id}`,
			method: 'delete',
			withCredentials: true, // share session between front-end & back-end
			header: { 'Access-Control-Allow-Origin': '*' },
		});
	else return Promise.reject('ID lacked!');
}

export function getArticleList() {
	return request({
		url: path.articleList,
		method: 'get',
		withCredentials: true,
		header: { 'Access-Control-Allow-Origin': '*' },
	});
}
