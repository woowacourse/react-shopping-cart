import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductList, Product, Cart, NotFound } from 'pages';
import Layout from 'components/Layout/Layout';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import spinner from 'assets/svg/spinner.svg';

function App() {
  return (
    <>
      <Suspense fallback={<ImgWrapper src={spinner} />}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" exact element={<ProductList />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" exact element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
