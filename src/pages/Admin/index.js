import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
	OrderedListOutlined,
	EditOutlined,
	FileAddOutlined,
} from '@ant-design/icons';
import PubSub from 'pubsub-js';
import AddArticle from '../AddArticle';
import ArticleList from '../ArticleList';
import Footer from '../../component/Footer';
import './styles.scss';

const { Content, Sider } = Layout;

const Admin = () => {
	const [collapse, setCollapse] = useState(false);
	const [selectedKey, setSelectedKey] = useState('addArticle');
	const navigate = useNavigate();

	const onCollapse = (collapsed) => {
		setCollapse(!!collapsed);
	};

	const handleClickList = (e) => {
		if (e.key === 'addArticle') {
			setSelectedKey('addArticle');
			navigate('/admin/add', { replace: false });
		}
		if (e.key === 'editArticle') {
			setSelectedKey('editArticle');
			navigate('/admin/edit/1', { replace: false });
		} else if (e.key === 'listArticle') {
			setSelectedKey('listArticle');
			navigate('/admin/list', { replace: false });
		}
	};

	PubSub.subscribe('key', (_, data) => {
		setSelectedKey(data.key);
	});

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
				<div className='logo'>
					<img src='/logo_transparent.png' alt='LOGO' />
				</div>
				<Menu
					theme='dark'
					defaultSelectedKeys={['addArticle']}
					selectedKeys={[selectedKey]}
					mode='inline'
				>
					<Menu.Item
						key='addArticle'
						icon={<FileAddOutlined />}
						onClick={handleClickList}
					>
						Add Article
					</Menu.Item>
					<Menu.Item
						key='listArticle'
						icon={<OrderedListOutlined />}
						onClick={handleClickList}
					>
						List Article
					</Menu.Item>
					<Menu.Item
						key='editArticle'
						icon={<EditOutlined />}
						onClick={handleClickList}
					>
						Edit Article
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				{/* <Header className='site-layout-background' style={{ padding: 0 }} /> */}
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Management System</Breadcrumb.Item>
						<Breadcrumb.Item>Work Station</Breadcrumb.Item>
					</Breadcrumb>
					<div
						className='site-layout-background'
						style={{ padding: 24, minHeight: 360 }}
					>
						<Routes>
							<Route path='/' element={<AddArticle />} />
							<Route path='/add' element={<AddArticle />} />
							<Route path='/edit/:id' element={<AddArticle />} />
							<Route path='/list' element={<ArticleList />} />
						</Routes>
					</div>
				</Content>
				<Footer />
			</Layout>
		</Layout>
	);
};

export default Admin;
