import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductList, Product, Cart, NotFound } from 'pages';
import ImgWrapper from 'components/ImgWrapper';
import spinner from 'assets/svg/spinner.svg';
import { PATH } from 'constants/path';
import Layout from 'components/Layout';

function App() {
  return (
    <Suspense
      fallback={<ImgWrapper isMini="true" src={spinner} alt="로딩 스피너" />}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductList />} />
            <Route path={`${PATH.PRODUCT}/:id`} element={<Product />} />
            <Route path={PATH.CART} element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
