import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Spin, Form, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import login from '../../services/login';
import 'antd/dist/antd.css';
import './styles.scss';

const Login = () => {
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onFinish = ({ username, password, remember }) => {
		/*
			values = {
				username: '',
				password: '',
				remember: true/false
			}
		*/
		setLoading(true);
		if (!username) {
			message.error('Username cannot be empty!');
			setTimeout(() => setLoading(false), 500);
			return false;
		} else if (!password) {
			message.error('Password cannot be empty!');
			setTimeout(() => setLoading(false), 500);
			return false;
		}
		login({ username, password }).then((res) => {
			// prevent frequent login
			setLoading(true);
			if (res.status === 'login success') {
				localStorage.setItem('openId', res.openId);
				navigate('/admin', { replace: true });
			} else {
				message.error('Wrong user name or password!');
				setTimeout(() => setLoading(false), 500);
			}
		});
	};

	// const onFinishFailed = (errorInfo) => {
	// 	console.log('Failed:', errorInfo);
	// };

	return (
		<main className='login__body flex-center'>
			<div className='login__container'>
				<Spin className='flex-center' tip='Loading...' spinning={isLoading}>
					<Card title='Chris Blog Management System' bordered={true}>
						<Form
							name='normal_login'
							className='login-form'
							initialValues={{ remember: true }}
							onFinish={onFinish}
						>
							<Form.Item
								name='username'
								rules={[
									{ required: true, message: 'Please input your Username' },
								]}
							>
								<Input
									prefix={<UserOutlined className='site-form-item-icon' />}
									placeholder='Username'
									size='large'
								/>
							</Form.Item>
							<Form.Item
								name='password'
								rules={[
									{ required: true, message: 'Please input your Password' },
								]}
							>
								<Input
									prefix={<LockOutlined className='site-form-item-icon' />}
									type='password'
									placeholder='Password'
									size='large'
								/>
							</Form.Item>
							<Form.Item>
								<Form.Item name='remember' valuePropName='checked' noStyle>
									<Checkbox>Remember me</Checkbox>
								</Form.Item>

								<a className='login-form-forgot' href='/'>
									Forgot password
								</a>
							</Form.Item>
							<div className='flex-center'>
								<Form.Item>
									<Button
										type='primary'
										htmlType='submit'
										className='login-form-button'
									>
										Log in
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Card>
				</Spin>
			</div>
		</main>
	);
};
export default Login;
