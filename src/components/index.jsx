import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import { ROUTE } from '../route';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.home.route} element={<Home />} />
        <Route path={ROUTE.shoppingCart.route} element={<div>shopping cart</div>} />
        <Route path={ROUTE.orderList.route} element={<div>order list</div>} />
        <Route path={ROUTE.productDetail.route} element={<div>product detail</div>} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
