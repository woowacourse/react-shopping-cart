import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";

import ProductListPage from "./pages/ProductListPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
