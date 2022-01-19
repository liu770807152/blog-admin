import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Row, Col, Button, Modal, message } from 'antd';
import { getArticleList, deleteArticle } from '../../services/article';
import PubSub from 'pubsub-js';

const { confirm } = Modal;

const ArticleList = () => {
	const [list, setList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getArticleList()
			.then((res) => setList(res.list))
			.catch((reason) => console.error(reason));
	}, []);

	const handleDelArticle = (id) => {
		confirm({
			title: 'Are you sure to delete this article?',
			content: 'Once pressed OK, article will be eternally removed!',
			onOk() {
				deleteArticle({ id }).then((res) => {
					message.success('Deletion succeeded!', res);
					getArticleList()
						.then((res) => setList(res.list))
						.catch((reason) => console.error(reason));
				});
			},
			onCancel() {
				message.info('Nothing happened.');
			},
		});
	};

	const handleUpdateArticle = (id) => {
		PubSub.publish('key', { key: 'editArticle' });
		navigate(`/admin/edit/${id}`, { replace: false });
	};

	const handleAddArticle = () => {
		PubSub.publish('key', { key: 'addArticle' });
		navigate(`/admin/add`, { replace: false });
	};

	return (
		<>
			<div className='flex justify-end'>
				<Button type='primary' danger onClick={handleAddArticle}>
					Add Article
				</Button>
			</div>
			<List
				header={
					<Row className='list-div'>
						<Col className='px-2' span={6}>
							<b>Title</b>
						</Col>
						<Col className='px-2' span={3}>
							<b>Type</b>
						</Col>
						<Col className='px-2' span={5}>
							<b>Introduction</b>
						</Col>
						<Col className='px-2' span={3}>
							<b>Date</b>
						</Col>
						<Col className='px-2' span={3}>
							<b>View Count</b>
						</Col>
						<Col className='px-2' span={4}>
							<b>Operation</b>
						</Col>
					</Row>
				}
				bordered
				dataSource={list}
				renderItem={(item) => (
					<List.Item>
						<Row className='min-w-full'>
							<Col className='px-2' span={6}>
								{item.title}
							</Col>
							<Col className='px-2' span={3}>
								{item.catalog}
							</Col>
							<Col className='px-2' span={5}>
								{item.introduction}
							</Col>
							<Col className='px-2' span={3}>
								{item.time}
							</Col>
							<Col className='px-2' span={3}>
								{item.viewCount}
							</Col>
							<Col className='px-2 space-x-1' span={4}>
								<Button
									type='primary'
									onClick={() => {
										handleUpdateArticle(item.id);
									}}
								>
									edit
								</Button>
								<Button
									onClick={() => {
										handleDelArticle(item.id);
									}}
								>
									delete
								</Button>
							</Col>
						</Row>
					</List.Item>
				)}
			/>
		</>
	);
};

export default ArticleList;
