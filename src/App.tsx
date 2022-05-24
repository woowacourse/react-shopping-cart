import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ROUTE_URL } from "constants/constants";

import { RootState } from "redux/store";

import { ProductDetail, Cart, OrderList, ProductList, NotFoundPage } from "./pages";

import SnackBar from "components/@shared/SnackBar";
import Header from "components/Header";

function App() {
  const { isShowSnackBar, message } = useSelector((state: RootState) => state.snackBar);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path={ROUTE_URL.ROOT} element={<ProductList />} />
        <Route path={ROUTE_URL.PRODUCT_LIST} element={<ProductList />} />
        <Route path={ROUTE_URL.PRODUCT_DETAIL + "/:id"} element={<ProductDetail />} />
        <Route path={ROUTE_URL.CART} element={<Cart />} />
        <Route path={ROUTE_URL.ORDER_LIST} element={<OrderList />} />
        <Route path={ROUTE_URL.ETC} element={<NotFoundPage />} />
      </Routes>
      {isShowSnackBar && <SnackBar key={Date.now()} message={message} />}
    </Router>
  );
}

export default App;
