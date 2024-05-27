import * as Styled from '../style';
import { LoadingMessage } from '../../LoadingFallback/style';

import { Suspense } from 'react';

import Header from '../../Header/Header';
import FooterButton from '../../FooterButton/FooterButton';
import OrderConfirmationContent from '../../Content/OrderConfirmationContent/OrderConfirmationContent';
import ApplyingCouponModal from '../../ApplyingCouponModal/ApplyingCouponModal';

const OrderConfirmation = () => {
  return (
    <Styled.Page>
      <Header />
      <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
        <OrderConfirmationContent />
        <FooterButton />
        <ApplyingCouponModal />
      </Suspense>
    </Styled.Page>
  );
};

export default OrderConfirmation;
