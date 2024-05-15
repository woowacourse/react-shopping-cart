import { AppStyle } from './App.styled';
import Header from './components/Header/Header';
import ShoppingCartOverview from './components/ShoppingCartOverview/ShoppingCartOverview';
import FloatingButton from './components/FloatingButton/FloatingButton';

function App() {
  return (
    <AppStyle>
      <Header></Header>
      <ShoppingCartOverview></ShoppingCartOverview>
      <FloatingButton label={'주문 확인'}></FloatingButton>
    </AppStyle>
  );
}

export default App;
