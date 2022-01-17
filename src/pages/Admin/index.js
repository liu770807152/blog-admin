import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import AddArticle from '../AddArticle';
import './styles.scss';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Admin = () => {
	const [collapse, setCollapse] = useState(false);

	const onCollapse = (collapsed) => {
		setCollapse(!!collapsed);
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
				<div className='logo' />
				<Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
					<Menu.Item key='1' icon={<PieChartOutlined />}>
						Work Station
					</Menu.Item>
					<Menu.Item key='2' icon={<DesktopOutlined />}>
						Article List
					</Menu.Item>
					<SubMenu key='sub1' icon={<UserOutlined />} title='Management'>
						<Menu.Item key='3'>Add Article</Menu.Item>
						<Menu.Item key='4'>Edit Article</Menu.Item>
					</SubMenu>
					{/* <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
						<Menu.Item key='6'>Team 1</Menu.Item>
						<Menu.Item key='8'>Team 2</Menu.Item>
					</SubMenu>
					<Menu.Item key='9' icon={<FileOutlined />}>
						Files
					</Menu.Item> */}
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
							<Route path='/' exact element={<AddArticle />} />
						</Routes>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Made with React & Ant Design. Created by Chris.
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Admin;
