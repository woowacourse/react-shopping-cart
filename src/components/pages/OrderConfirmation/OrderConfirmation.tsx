import * as Styled from './style';
import { LoadingMessage } from '../../LoadingFallback/style';

import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../Header/Header';
import OrderConfirmationContent from '../../Content/OrderConfirmationContent/OrderConfirmationContent';
import OrderButton from '../../OrderButton/OrderButton';

import MESSAGE from '../../../constants/Message';

const OrderConfirmation = () => {
  const navigator = useNavigate();

  return (
    <Styled.OrderConfirmation>
      <Header onClick={() => navigator('/')} />
      <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
        <OrderConfirmationContent />
        <OrderButton onClick={() => console.log(MESSAGE.orderConfirmation)} />
      </Suspense>
    </Styled.OrderConfirmation>
  );
};

export default OrderConfirmation;
