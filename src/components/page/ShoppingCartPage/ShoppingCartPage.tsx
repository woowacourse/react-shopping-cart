import CartContainer from './CartContainer/CartContainer';
import ConfirmButton from './ConfirmButton/ConfirmButton';
import ErrorBoundary from '../ErrorBoundary';
import Header from '../../common/Header/Header';
import { Suspense } from 'react';
import TitleContainer from '../../common/TitleContainer/TitleContainer';
import styled from '@emotion/styled';

export default function ShoppingCartPage() {
  return (
    <ErrorBoundary>
      <Suspense>
        <Header>SHOP</Header>
        <Content>
          <TitleContainer title="장바구니" />
          <CartContainer />
        </Content>

        <ConfirmButton />
      </Suspense>
    </ErrorBoundary>
  );
}

const Content = styled.section({
  padding: '36px 24px',
  height: '100%',
  flex: '1 0 auto',
});
