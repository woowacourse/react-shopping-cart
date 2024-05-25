import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ConfirmPurchasePage from './pages/ConfirmPurchasePage';
import styled from 'styled-components';
import CompletePurchasePage from './pages/CompletePurchasePage';

const AppContainer = styled.div`
  max-width: 768px;
  width: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/confirm-purchase" element={<ConfirmPurchasePage />} />
          <Route path="/complete-purchase" element={<CompletePurchasePage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
