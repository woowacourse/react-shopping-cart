import { Suspense } from 'react';
import Header from '../../common/Header/Header';
import OrderButton from '../../common/OrderButton/OrderButton';
import * as Styled from './style';

import { LoadingMessage } from '../../common/LoadingFallback/style';
import BuyItemsContents from './BuyItemsContents';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constant/route';
import { useResetRecoilState } from 'recoil';
import {
  applyCouponState,
  isShippingFeeDiscountState,
} from '../../../recoil/coupons';
import { mountainousAreaState } from '../../../recoil/cartItems';

const BuyItems = () => {
  const navigator = useNavigate();

  const applyCouponReset = useResetRecoilState(applyCouponState);
  const shippingFeeDiscountReset = useResetRecoilState(
    isShippingFeeDiscountState,
  );
  const mountainousAreaReset = useResetRecoilState(mountainousAreaState);

  return (
    <Styled.BuyItems>
      <Header />

      <Styled.Container>
        <Suspense fallback={<LoadingMessage>로딩중...</LoadingMessage>}>
          <BuyItemsContents />
        </Suspense>
      </Styled.Container>
      <OrderButton
        onClick={() => {
          navigator(ROUTE.cart.path);
          applyCouponReset();
          shippingFeeDiscountReset();
          mountainousAreaReset();
        }}
        isOrderable={true}
      >
        장바구니로 돌아가기
      </OrderButton>
    </Styled.BuyItems>
  );
};

export default BuyItems;
