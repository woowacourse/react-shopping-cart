import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage>요청하신 페이지를 찾을 수 없습니다.</NotFoundPage>} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
