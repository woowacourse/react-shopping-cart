import * as Styled from './style';
import { LoadingMessage } from '../../LoadingFallback/style';

import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../Header/Header';
import PaymentConfirmationContent from '../../Content/PaymentConfirmationContent/PaymentConfirmationContent';
import OrderButton from '../../OrderButton/OrderButton';

const PaymentConfirmation = () => {
  const navigator = useNavigate();

  return (
    <Styled.OrderConfirmation>
      <Header />
      <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
        <PaymentConfirmationContent />
        <OrderButton onClick={() => navigator('/')} />
      </Suspense>
    </Styled.OrderConfirmation>
  );
};

export default PaymentConfirmation;
