import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import { Content, Layout } from './components/common/Layout/Layout';
import AsyncBoundary from './components/AsyncBoundary/AsyncBoundary';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AsyncBoundary page loadingFallback={<h1>Loading...</h1>}>
        <Layout>
          <Routes>
            <Route element={<Content />}>
              <Route index element={<ProductPage />} />
            </Route>
          </Routes>
        </Layout>
      </AsyncBoundary>
    </BrowserRouter>
  );
};

export default Router;
