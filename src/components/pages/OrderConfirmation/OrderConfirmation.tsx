import { Suspense } from 'react';
import Header from '../../Header/Header';
import OrderButton from '../../OrderButton/OrderButton';
import OrderConfirmationContent from './OrderConfirmationContent';
import * as Styled from './style';

import { useNavigate } from 'react-router-dom';
import { LoadingMessage } from '../../LoadingFallback/style';

const OrderConfirmation = () => {
  const navigator = useNavigate();

  return (
    <Styled.OrderConfirmation>
      <Header onClick={() => navigator(-1)} />
      <Styled.Container>
        <Suspense fallback={<LoadingMessage>로딩중...</LoadingMessage>}>
          <OrderConfirmationContent />
        </Suspense>
      </Styled.Container>
      <OrderButton onClick={() => console.log('주문 확인')} isOrderable={false}>
        주문 확인
      </OrderButton>
    </Styled.OrderConfirmation>
  );
};

export default OrderConfirmation;
