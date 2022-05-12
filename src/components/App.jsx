import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import OrderList from '../pages/OrderList/OrderList';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import { ROUTE } from '../route';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <Routes>
        <Route path={ROUTE.home.route} element={<Home />} />
        <Route path={ROUTE.shoppingCart.route} element={<ShoppingCart />} />
        <Route path={ROUTE.orderList.route} element={<OrderList />} />
        <Route path={ROUTE.productDetail.route} element={<ProductDetail />} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
