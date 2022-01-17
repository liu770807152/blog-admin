import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import './index.css';
import Main from './pages/Main';

ReactDOM.render(
	<>
		<Helmet>
			<meta charSet='utf-8' />
			<meta name='description' content='Chris Blog Management System' />
			<title>Chris Blog Management System</title>
			<link rel='shortcut icon' href='/favicon.ico' />
		</Helmet>
		<Main />
	</>,
	document.getElementById('root')
);
