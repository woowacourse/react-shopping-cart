import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './pages/Main';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import Carts from './pages/Carts';
import ProductDetailContainer from './components/ProductDetail/ProductDetailContainer';

import GlobalStyle from './GlobalStyle';

import PATH from './constants/path';
// import SnackBar from './SnackBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path={`${PATH.ROOT}`} element={<Main />} />
          <Route path={`${PATH.ORDERS}`} element={<Orders />} />
          <Route path={`${PATH.CARTS}`} element={<Carts />} />
          <Route
            path={`${PATH.PRODUCT}/:id`}
            element={<ProductDetailContainer />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <SnackBar></SnackBar> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
