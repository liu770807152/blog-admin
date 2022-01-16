import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Spin, Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './styles.scss';

const Login = () => {
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onFinish = (values) => {
		/*
			values = {
				username: '',
				password: '',
				remember: true/false
			}
		*/
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		navigate('/admin', { replace: true });
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

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
							<div className='flex-center'>
								<Form.Item>
									Or <a href='/'>register now!</a>
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
