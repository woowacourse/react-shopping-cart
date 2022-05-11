import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ProductList from 'pages/ProductList/ProductList';
import { ProductList, Product, Cart } from 'pages';
import Header from 'components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<h1>로딩중</h1>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" exact element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
