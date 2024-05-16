import './App.css';
import './reset.css';

import CartItemContainer from './components/CartItemContainer/CartItemContainer';
import FooterButton from './components/FooterButton/FooterButton';
import Header from './components/Header/Header';
import OrderAmount from './components/OrderAmount/OrderAmount';
import { Suspense } from 'react';
import TitleContainer from './components/TitleContainer/TitleContainer';
import { hasCheckedItemsState } from './recoil/selectors';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

function App() {
  const hasCheckedItems = useRecoilValue(hasCheckedItemsState);

  return (
    <>
      <Header />
      <Content>
        <TitleContainer title="장바구니" />
        <Suspense fallback={<div>로딩 중입니다...</div>}>
          <CartItemContainer />
          <OrderAmount />
        </Suspense>
      </Content>
      <FooterButton buttonText="주문 확인" disabled={!hasCheckedItems} />
    </>
  );
}

const Content = styled.section({
  padding: '36px 24px',
  display: 'flex',
  flexDirection: 'column',
});

export default App;
