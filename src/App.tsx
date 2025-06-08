import "./App.css";
import { PAGE_URL } from "./constants/PageUrl";
import { Route, Routes } from "react-router";
import OrderComplete from "./page/OrderComplete/OrderComplete";
import OrderPage from "./page/OrderPage";
import { FunnelProvider } from "./contexts/FunnelContext";

function App() {
  return (
    <FunnelProvider>
      <Routes>
        <Route path={PAGE_URL.HOME} element={<OrderPage />} />
        <Route path={PAGE_URL.ORDER_COMPLETE} element={<OrderComplete />} />
      </Routes>
    </FunnelProvider>
  );
}

export default App;
