import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import {
	Row,
	Col,
	Input,
	Form,
	Select,
	Button,
	DatePicker,
	message,
} from 'antd';
import moment from 'moment';
import {
	addArticle,
	updateArticle,
	getArticleById,
} from '../../services/article';
import './styles.scss';

const { Option } = Select,
	{ TextArea } = Input,
	{ Item } = Form;

const AddArticle = () => {
	const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加; 如果不是0，说明是修改
	const [articleInfo, setArticleInfo] = useState({
		title: '',
		catalogId: '',
		content: '',
		introduction: '',
		addTime: '',
	});
	const renderer = new marked.Renderer();
	const formRef = useRef();
	const { id } = useParams();

	marked.setOptions({
		renderer: renderer,
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		smartypants: false,
	});

	useEffect(() => {
		(async function getCurArticle() {
			if (id) {
				let { data: article } = await getArticleById({ id });
				if (article.length) {
					article = article[0];
					setArticleId(article.id);
					setArticleInfo(article);
					article.type = article.catalogId;
					article.date = moment(article.addTime);
					formRef.current.setFieldsValue(article);
				} else {
					message.error('Fetch article failure!');
				}
			} else {
				const emptyState = {
					title: '',
					catalogId: '',
					content: '',
					introduction: '',
					addTime: '',
				};
				setArticleInfo(emptyState);
				emptyState.type = 1;
				emptyState.date = moment();
				formRef.current.setFieldsValue(emptyState);
			}
		})();
	}, [id]);

	const changeContent = (e) => {
		const str = e.target.value;
		let html = marked(str);
		setArticleInfo({ ...articleInfo, content: html });
	};

	const changeIntroduction = (e) => {
		const str = e.target.value;
		let html = marked(str);
		setArticleInfo({ ...articleInfo, introduction: html });
	};

	const onFinish = ({ title, type, content, introduction, date }) => {
		if (!title || !type || !content || !introduction || !date) {
			message.error('Missing required field!');
			return;
		}
		date = date.format('YYYY-MM-DD HH:mm:ss');
		const articleObj = Object.assign(
			{},
			{
				title,
				catalogId: type,
				content,
				introduction,
				addTime: date,
			}
		);
		// add article to MySQL
		if (articleId === 0) {
			articleObj.viewCount = 0;
			addArticle(articleObj)
				.then((res) => {
					res.insertId && setArticleId(res.insertId);
					if (res.succeeded) {
						message.success('Article posted!');
					} else {
						message.error('Post article failure!');
					}
				})
				.catch((reason) => console.error(reason));
		} else {
			// update existed article in MySQL
			articleObj.id = articleId;
			updateArticle(articleObj)
				.then((res) => {
					if (res.succeeded) message.success('Article updated!');
					else {
						message.error('Update article failure!');
					}
				})
				.catch((reason) => console.error(reason));
		}
	};

	return (
		<Form
			name='customized_form_controls'
			layout='vertical'
			initialValues={{
				type: articleInfo?.catalogId ?? 1,
				title: articleInfo.title,
				introduction: articleInfo.introduction,
				content: articleInfo.content,
				date: articleInfo?.date ?? moment(),
			}}
			onFinish={onFinish}
			ref={formRef}
		>
			<Row gutter={5}>
				<Col span={18}>
					<Row gutter={10} className='mb-3 space-x-1'>
						<Col span={18}>
							<Item
								name={'title'}
								rules={[{ required: true, message: 'Please input title!' }]}
							>
								<Input placeholder='blog title' size='large' />
							</Item>
						</Col>
						<Col span={4}>
							<Item name={'type'}>
								<Select size='large'>
									<Option value={1}>Experience</Option>
									<Option value={2}>Tutorial</Option>
								</Select>
							</Item>
						</Col>
					</Row>
					<Row gutter={10}>
						<Col span={12}>
							<Item
								name={'content'}
								rules={[{ required: true, message: 'Please input content!' }]}
							>
								<TextArea
									className='markdown-content'
									rows={35}
									placeholder='content'
									onChange={changeContent}
								/>
							</Item>
						</Col>
						<Col span={12}>
							<div
								className='show-html'
								dangerouslySetInnerHTML={{
									__html: marked(articleInfo.content),
								}}
							></div>
						</Col>
					</Row>
				</Col>
				<Col span={6}>
					<Row className='space-x-2 mb-3'>
						<Item>
							<Button size='large'>Download</Button>
						</Item>
						<Item>
							<Button type='primary' size='large' htmlType='submit'>
								Post
							</Button>
						</Item>
					</Row>
					<Row className='mb-4'>
						<Col className='space-y-2' span={24}>
							<Item
								name={'introduction'}
								rules={[
									{ required: true, message: 'Please input introduction!' },
								]}
							>
								<TextArea
									rows={4}
									placeholder='introduction'
									onChange={changeIntroduction}
								/>
							</Item>
							<div
								className='introduction-html'
								dangerouslySetInnerHTML={{
									__html: marked(articleInfo.introduction),
								}}
							></div>
						</Col>
					</Row>
					<Row>
						<Col span={15}>
							<Item name={'date'}>
								<DatePicker
									placeholder='select date'
									size='large'
									format={'YYYY-MM-DD'}
								/>
							</Item>
						</Col>
					</Row>
				</Col>
			</Row>
		</Form>
	);
};

export default AddArticle;
