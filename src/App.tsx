import * as S from './App.styles';
import { CartHeader, CartList, OrderPriceSummary } from './features/cart/ui';
import Footer from './widgets/footer/ui/Footer';
import Navbar from './widgets/navbar/ui/Navbar';

function App() {
  return (
    <S.AppContainer>
      <Navbar />
      <S.AppContent>
        <CartHeader cartTypeQuantity={4} />
        <CartList />
        <OrderPriceSummary />
      </S.AppContent>
      <Footer />
    </S.AppContainer>
  );
}

export default App;
