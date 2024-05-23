import * as Styled from '../style';
import { LoadingMessage } from '../../LoadingFallback/style';

import { Suspense } from 'react';

import Header from '../../Header/Header';
import OrderButton from '../../OrderButton/OrderButton';
import ShoppingCartContent from '../../Content/ShoppingCartContent/ShoppingCartContent';

const ShoppingCart = () => {
  return (
    <Styled.Page>
      <Header />
      <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
        <ShoppingCartContent />
        <OrderButton />
      </Suspense>
    </Styled.Page>
  );
};

export default ShoppingCart;
