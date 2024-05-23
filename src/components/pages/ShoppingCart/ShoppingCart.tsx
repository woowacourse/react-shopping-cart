import * as Styled from './style';
import { LoadingMessage } from '../../LoadingFallback/style';

import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../Header/Header';
import OrderButton from '../../OrderButton/OrderButton';
import ShoppingCartContent from '../../Content/ShoppingCartContent/ShoppingCartContent';

const ShoppingCart = () => {
  const navigator = useNavigate();

  return (
    <Styled.ShoppingCart>
      <Header />
      <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
        <ShoppingCartContent />
        <OrderButton onClick={() => navigator('/paymentConfirmation')} />
      </Suspense>
    </Styled.ShoppingCart>
  );
};

export default ShoppingCart;
