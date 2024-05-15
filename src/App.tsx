import styled from '@emotion/styled';

import Header from './components/Header/Header';
import FooterButton from './components/FooterButton/FooterButton';
import TitleContainer from './components/TitleContainer/TitleContainer';
import OrderAmount from './components/OrderAmount/OrderAmount';

import './App.css';
import './reset.css';
import CartItemContainer from './components/CartItemContainer/CartItemContainer';

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
