import React, { useState } from 'react';
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
import { addArticle, updateArticle } from '../../services/article';
import './styles.scss';

const { Option } = Select,
	{ TextArea } = Input,
	{ Item } = Form;

const AddArticle = () => {
	const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [markdownContent, setMarkdownContent] = useState(''); //html内容
	const [introductionHtml, setIntroductionHtml] = useState(''); //简介的html内容
	const renderer = new marked.Renderer();

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

	const changeContent = (e) => {
		let html = marked(e.target.value);
		setMarkdownContent(html);
	};

	const changeIntroduction = (e) => {
		let html = marked(e.target.value);
		setIntroductionHtml(html);
	};

	const onFinish = ({ title, type, content, introduction, date }) => {
		console.log(articleId);
		if (!title || !type || !content || !introduction || !date) {
			message.error('Missing required field!');
			return;
		}
		date = date.format('YYYY-MM-DD HH:mm:ss');
		const articleObj = Object.assign(
			{},
			{
				title,
				catalogID: type,
				content,
				introduction,
				addTime: date,
			}
		);
		// add article to MySQL
		if (articleId === 0) {
			articleObj.viewCount = Math.ceil(Math.ceil(Math.random() * 100) + 1000);
			addArticle(articleObj)
				.then((res) => {
					setArticleId(res.insertId);
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
				type: 2,
			}}
			onFinish={onFinish}
		>
			<Row gutter={5}>
				<Col span={18}>
					<Row gutter={10} className='mb-3 space-x-1'>
						<Col span={18}>
							<Item name={'title'}>
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
							<Item name={'content'}>
								<TextArea
									className='markdown-content'
									rows={35}
									placeholder='enter content'
									onChange={changeContent}
								/>
							</Item>
						</Col>
						<Col span={12}>
							<div
								className='show-html'
								dangerouslySetInnerHTML={{ __html: markdownContent }}
							></div>
						</Col>
					</Row>
				</Col>
				<Col span={6}>
					<Row className='space-y-3'>
						<Col span={24}>
							<Row>
								<Col span={5}>
									<Item>
										<Button size='large'>Save</Button>
									</Item>
								</Col>
								<Col span={19}>
									<Item>
										<Button type='primary' size='large' htmlType='submit'>
											Post
										</Button>
									</Item>
								</Col>
							</Row>
						</Col>
						<Col className='space-y-2' span={24}>
							<Item name={'introduction'}>
								<TextArea
									rows={4}
									placeholder='enter introduction'
									onChange={changeIntroduction}
								/>
							</Item>
							<div
								className='introduce-html'
								dangerouslySetInnerHTML={{
									__html: introductionHtml,
								}}
							></div>
						</Col>
						<Col span={12}>
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
