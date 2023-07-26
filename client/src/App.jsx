import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Create from './pages/Create/Create';
import Edit from './pages/Edit/Edit';

export const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route path="/edit" exact element={<Edit />} />
					<Route path="/" exact element={<Create />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};
