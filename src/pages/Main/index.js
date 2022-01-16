import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Login';
import Admin from '../Admin';

const Main = () => {
	return (
		<Router>
			<Routes>
				<Route path='/login' exact element={<Login />} />
				<Route path='/admin' element={<Admin />} />
			</Routes>
		</Router>
	);
};

export default Main;
