import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileLayout from './components/common/MobileLayout/MobileLayout';
import CartPage from './pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<CartPage />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;
