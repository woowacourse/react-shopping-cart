import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductListPage from "./pages/ProductListPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
