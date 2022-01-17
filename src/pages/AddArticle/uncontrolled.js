import React, { useState } from 'react';
import { marked } from 'marked';
import { Row, Col, Input, Form, Select, Button, DatePicker } from 'antd';
import './styles.scss';

const { Option } = Select,
	{ TextArea } = Input;

const AddArticle = () => {
	const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [articleTitle, setArticleTitle] = useState(''); //文章标题
	const [articleContent, setArticleContent] = useState(''); //markdown的编辑内容
	const [markdownContent, setMarkdownContent] = useState(''); //html内容
	const [introduceMd, setIntroduceMd] = useState(); //简介的markdown内容
	const [introduceHtml, setIntroduceHtml] = useState(''); //简介的html内容
	const [showDate, setShowDate] = useState(); //发布日期
	const [updateDate, setUpdateDate] = useState(); //修改日志的日期
	const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
	const [selectedType, setSelectType] = useState(1); //选择的文章类别
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
		setArticleContent(e.target.value);
		let html = marked(e.target.value);
		setMarkdownContent(html);
	};

	const changeIntroduce = (e) => {
		setIntroduceMd(e.target.value);
		let html = marked(e.target.value);
		setIntroduceHtml(html);
	};

	return (
		<Row gutter={5}>
			<Col span={18}>
				<Row gutter={10} className='mb-3 space-x-1'>
					<Col span={18}>
						<Input placeholder='blog title' size='large' />
					</Col>
					<Col span={4}>
						<Select defaultValue={1} size='large'>
							<Option value={1}>Tutorial</Option>
							<Option value={2}>Discussion</Option>
						</Select>
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={12}>
						<TextArea
							className='markdown-content'
							rows={35}
							placeholder='enter content'
							onChange={changeContent}
							onPressEnter={changeContent}
						/>
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
					<Col className='space-x-2' span={24}>
						<Button size='large'>Save</Button>
						<Button type='primary' size='large'>
							Post
						</Button>
					</Col>
					<Col className='space-y-2' span={24}>
						<TextArea
							rows={4}
							placeholder='enter introduction'
							onChange={changeIntroduce}
							onPressEnter={changeIntroduce}
						/>
						<div
							className='introduce-html'
							dangerouslySetInnerHTML={{
								__html: introduceHtml,
							}}
						></div>
					</Col>
					<Col span={12}>
						<div className='date-select'>
							<DatePicker placeholder='select date' size='large' />
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default AddArticle;
