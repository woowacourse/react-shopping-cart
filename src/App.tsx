import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsListPage from './pages/ProductsListPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<ProductsListPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
