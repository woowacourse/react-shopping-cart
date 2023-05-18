import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import NotFoundPage from '@/page/NotFoundPage';
import ProductPage from '@/page/ProductPage';

function App() {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<Routes>
					<Route path="/" element={<ProductPage />} />
					<Route
						path="*"
						element={
							<NotFoundPage>요청하신 페이지를 찾을 수 없습니다.</NotFoundPage>
						}
					/>
				</Routes>
			</RecoilRoot>
		</BrowserRouter>
	);
}

export default App;
