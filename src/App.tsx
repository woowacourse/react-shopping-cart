import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <RecoilRoot>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage>요청하신 페이지를 찾을 수 없습니다.</NotFoundPage>} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
