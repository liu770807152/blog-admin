import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import './index.css';
import Main from './pages/Main';

ReactDOM.render(
	<React.StrictMode>
		<Helmet>
			<meta charSet='utf-8' />
			<meta name='description' content='Chris Blog Management System' />
			<title>Chris Blog Management System</title>
			<link rel='shortcut icon' href='%PUBLIC_URL%/favicon.ico' />
		</Helmet>
		<Main />
	</React.StrictMode>,
	document.getElementById('root')
);
