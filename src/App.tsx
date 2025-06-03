import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OrderConfirm } from './pages/OrderConfirm/OrderConfirm';
import { ShoppingCart } from './pages/ShoppingCart/ShoppingCart';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <Routes>
        <Route path="/" element={<ShoppingCart />}></Route>
        <Route path="/confirm" element={<OrderConfirm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
