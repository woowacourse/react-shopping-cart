import { Route, Routes } from "react-router-dom";
import ProductList from "@/pages/home/components/product-list/ProductList";
import Cart from "@/pages/cart/components/cart/Cart";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/not-found/NotFound";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
