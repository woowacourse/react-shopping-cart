import "./App.css";
import { PAGE_URL } from "./constants/PageUrl";
import { Route, Routes } from "react-router";
import OrderComplete from "./page/OrderComplete/OrderComplete";
import OrderPage from "./page/OrderPage";
import { CartProvider } from "./components/Cart/CartProvider";
import { FunnelProvider } from "./contexts/FunnelContext";

function App() {
  return (
    <Routes>
      <CartProvider>
        <FunnelProvider>
          <Route path={PAGE_URL.HOME} element={<OrderPage />} />
          <Route path={PAGE_URL.ORDER_COMPLETE} element={<OrderComplete />} />
        </FunnelProvider>
      </CartProvider>
    </Routes>
  );
}

export default App;
