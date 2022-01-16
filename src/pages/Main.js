import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';

const Main = () => {
	return (
		<Router>
			<Routes>
				<Route path='/login' exact element={<Login />} />
			</Routes>
		</Router>
	);
};

export default Main;
