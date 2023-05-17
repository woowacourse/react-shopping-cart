import { RecoilRoot } from 'recoil';
import { Header } from './layouts/Header';
import { ProductList } from './pages/ProductList';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <RecoilRoot>
      <Header />
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};
