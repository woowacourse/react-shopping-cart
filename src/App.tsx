import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Check from '@/components/Check';

function App() {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<Routes>
					<Route path="/" element={<Check />} />
					<Route path="/test" element={<div>test</div>} />
				</Routes>
			</RecoilRoot>
		</BrowserRouter>
	);
}

export default App;
