import * as Styled from '../style';
import { LoadingMessage } from '../../LoadingFallback/style';

import { Suspense } from 'react';

import Header from '../../Header/Header';

import OrderButton from '../../OrderButton/OrderButton';
import OrderConfirmationContent from '../../Content/OrderConfirmationContent/OrderConfirmationContent';

const OrderConfirmation = () => {
  return (
    <Styled.Page>
      <Header />
      <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
        <OrderConfirmationContent />
        <OrderButton />
      </Suspense>
    </Styled.Page>
  );
};

export default OrderConfirmation;
