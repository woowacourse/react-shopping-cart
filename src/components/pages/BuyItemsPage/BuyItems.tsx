import { Suspense } from 'react';
import Header from '../../common/Header/Header';
import OrderButton from '../../common/OrderButton/OrderButton';
import * as Styled from './style';

import { LoadingMessage } from '../../common/LoadingFallback/style';
import BuyItemsContents from './BuyItemsContents';
import { ROUTE } from '../../../constant/route';
import { useNavigate } from 'react-router-dom';

const BuyItems = () => {
  const navigator = useNavigate();
  return (
    <Styled.BuyItems>
      <Header />

      <Styled.Container>
        <Suspense fallback={<LoadingMessage>로딩중...</LoadingMessage>}>
          <BuyItemsContents />
        </Suspense>
      </Styled.Container>
      <OrderButton
        onClick={() => navigator(ROUTE.cart.path)}
        isOrderable={true}
      >
        장바구니로 돌아가기
      </OrderButton>
    </Styled.BuyItems>
  );
};

export default BuyItems;
