import * as Styled from '../style';
import { LoadingMessage } from '../../LoadingFallback/style';

import { Suspense } from 'react';

import Header from '../../Header/Header';
import PaymentConfirmationContent from '../../Content/PaymentConfirmationContent/PaymentConfirmationContent';
import OrderButton from '../../OrderButton/OrderButton';

const PaymentConfirmation = () => {
  return (
    <Styled.Page>
      <Header />
      <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
        <PaymentConfirmationContent />
        <OrderButton />
      </Suspense>
    </Styled.Page>
  );
};

export default PaymentConfirmation;
