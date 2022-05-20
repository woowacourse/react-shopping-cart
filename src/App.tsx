import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SnackBar from "./components/@shared/SnackBar";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";
import Header from "./components/Header";
import { RootState } from "./redux/store";
import NotFoundPage from "./pages/NotFound";

function App() {
  const { isShowSnackBar, message } = useSelector((state: RootState) => state.snackBar);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {isShowSnackBar && <SnackBar key={Date.now()} message={message} />}
    </Router>
  );
}

export default App;
