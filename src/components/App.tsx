import ProductDetail from '@/pages/ProductDetail/ProductDetail';
import ShoppingCart from '@/pages/ShoppingCart/ShoppingCart';
import Home from '@/pages/Home/Home';
import OrderList from '@/pages/OrderList/OrderList';
import { ROUTE } from '@/route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound/NotFound';
import SignUp from '@/pages/Customers/SignUp/SignUp';
import Login from '@/pages/Customers/Login/Login';
import Edit from '@/pages/Customers/Edit/Edit';
import Leave from '@/pages/Customers/Leave/Leave';
import EditPassword from '@/pages/Customers/EditPassword/EditPassword';
import SnackBar from '@/components/common/Snackbar/Snackbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.Home} element={<Home />} />
        <Route path={ROUTE.ShoppingCart} element={<ShoppingCart />} />
        <Route path={ROUTE.OrderList} element={<OrderList />} />
        <Route path={ROUTE.ProductDetail} element={<ProductDetail />} />

        <Route path={ROUTE.SignUp} element={<SignUp />} />
        <Route path={ROUTE.Login} element={<Login />} />
        <Route path={ROUTE.Edit} element={<Edit />} />
        <Route path={ROUTE.Leave} element={<Leave />} />
        <Route path={ROUTE.EditPassword} element={<EditPassword />} />

        <Route path={ROUTE.NotFound} element={<NotFound />} />
      </Routes>
      <SnackBar />
    </BrowserRouter>
  );
}

export default App;
