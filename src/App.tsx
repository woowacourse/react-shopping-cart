import * as S from './App.styled';
import CartHeader from './features/cart/ui/CartHeader';
import Footer from './widgets/footer/ui/Footer';
import Navbar from './widgets/navbar/ui/Navbar';

function App() {
  return (
    <S.AppContainer>
      <Navbar />
      <S.AppContent>
        <CartHeader cartTypeQuantity={4} />
      </S.AppContent>
      <Footer />
    </S.AppContainer>
  );
}

export default App;
