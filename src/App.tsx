import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOrder from "./pages/CheckOrder";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/check-order" element={<CheckOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
