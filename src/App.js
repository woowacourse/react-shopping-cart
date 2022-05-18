import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/server-error" element={<ErrorPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
