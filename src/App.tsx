import { BrowserRouter, Route, Routes } from 'react-router';
import CartPage from './pages/cart/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
