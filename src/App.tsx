import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Main from "./pages/Main";
import OrderConfirm from "./pages/OrderConfirm";
import PaymentConfirm from "./pages/PaymentConfirm";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/orderConfirm" element={<OrderConfirm />} />
        <Route path="/paymentConfirm" element={<PaymentConfirm />} />
      </Routes>
    </>
  );
}

export default App;
