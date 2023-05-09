import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsListPage from './pages/ProductsListPage';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<ProductsListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
