import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import SnackBar from "./components/@shared/SnackBar";
import Header from "./components/Header";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";
import NotFound from "./pages/NotFound";
import routes from "./routes";

function App() {
  const { isShowSnackBar, message } = useSelector((state: RootState) => state.snackBar);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path={routes.home} element={<ProductList />} />
        <Route path={routes.productDetail()} element={<ProductDetail />} />
        <Route path={routes.cart} element={<Cart />} />
        <Route path={routes.orderList} element={<OrderList />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {isShowSnackBar && <SnackBar key={Date.now()} message={message} />}
    </Router>
  );
}

export default App;
