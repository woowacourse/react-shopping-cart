import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import ProductsListPage from './pages/ProductsListPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<ProductsListPage />} />
          <Route path='cart' element={<CartPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
