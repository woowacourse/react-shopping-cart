import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ConfirmPurchasePage from './pages/ConfirmPurchasePage';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 768px;
  width: 100%;
`

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route
            path="/"
            element={<CartPage />}
          />
          <Route
            path="/confirm-purchase"
            element={<ConfirmPurchasePage />}
          />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
