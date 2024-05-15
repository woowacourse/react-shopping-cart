import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileLayout from './components/common/MobileLayout/MobileLayout';
import CartPage from './pages/CartPage';
import ConfirmPurchasePage from './pages/ConfirmPurchasePage';

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/confirm-purchase" element={<ConfirmPurchasePage />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;
