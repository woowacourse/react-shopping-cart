import "./App.css";
import { PAGE_URL } from "./constants/PageUrl";
import Cart from "./page/Cart";
import { Route, Routes } from "react-router";
import OrderComplete from "./page/OrderComplete";

function App() {
  return (
    <Routes>
      <Route path={PAGE_URL.HOME} element={<Cart />} />
      <Route path={PAGE_URL.ORDER_COMPLETE} element={<OrderComplete />} />
    </Routes>
  );
}

export default App;
