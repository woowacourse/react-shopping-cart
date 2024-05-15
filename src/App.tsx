import './App.css';
import './reset.css';

import CartItemContainer from './components/CartItemContainer/CartItemContainer';
import FooterButton from './components/FooterButton/FooterButton';
import Header from './components/Header/Header';
import OrderAmount from './components/OrderAmount/OrderAmount';
import TitleContainer from './components/TitleContainer/TitleContainer';
import styled from '@emotion/styled';

const Content = styled.section({
  padding: '36px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
});

function App() {
  return (
    <>
      <Header />
      <Content>
        <TitleContainer title="장바구니" description="현재 2종류의 상품이 담겨있습니다." />

        <CartItemContainer />
        <OrderAmount />
      </Content>
      <FooterButton buttonText="주문 확인" />
    </>
  );
}

export default App;
