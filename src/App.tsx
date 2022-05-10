import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/*" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
