import { Suspense } from 'react';
import styled from '@emotion/styled';

import { hasCheckedItemsState } from './recoil/selectors';
import { useRecoilValue } from 'recoil';

import Header from './components/Header/Header';
import FooterButton from './components/FooterButton/FooterButton';
import TitleContainer from './components/TitleContainer/TitleContainer';
import CartItemContainer from './components/CartItemContainer/CartItemContainer';
import OrderAmount from './components/OrderAmount/OrderAmount';

import './App.css';
import './reset.css';

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
